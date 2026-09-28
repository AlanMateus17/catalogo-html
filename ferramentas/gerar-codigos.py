"""
gerar-codigos.py — FERRAMENTA DO PROFESSOR (os alunos não precisam deste arquivo)

O que faz:
  1. Lê os códigos da pasta trechos/ e gera o js/codigos-dados.js,
     que é o que os painéis "Ver código" do site mostram.
  2. Gera uma DEMO de cada código na pasta demos/: uma página que tem só
     aquele código, como se o aluno tivesse colado as abas num projeto em branco.

Quando usar:
  Sempre que você editar, criar ou apagar um trecho em trechos/.

Como usar (no terminal, dentro da pasta pagina-completa):
  python ferramentas/gerar-codigos.py

Como a pasta trechos/ é organizada:
  trechos/indice.json         -> a lista de trechos, na ordem em que aparecem.
                                 Campos: id, grupo, titulo, nota, onde (opcional),
                                 exemplo (link para o Catálogo), local ("head" quando
                                 o HTML vai no <head>), requer (id de outro trecho que
                                 precisa vir junto) e encaixe (onde o HTML entra dentro
                                 do trecho requerido).
  trechos/<id>/codigo.html    -> o HTML do trecho   (opcional)
  trechos/<id>/codigo.css     -> o CSS do trecho    (opcional)
  trechos/<id>/codigo.js      -> o JS do trecho     (opcional)

Para criar um trecho novo:
  1. crie a pasta trechos/<id-novo>/ com codigo.html, codigo.css e/ou codigo.js;
  2. acrescente um item com o mesmo id no trechos/indice.json;
  3. rode este script;
  4. no index.html (ou no codigos.html), coloque <div class="codigo" data-codigo="id-novo"></div>
     onde o painel deve aparecer.
"""
import html as html_lib
import json
import os
import re

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASTA_TRECHOS = os.path.join(RAIZ, "trechos")
PASTA_DEMOS = os.path.join(RAIZ, "demos")
SAIDA = os.path.join(RAIZ, "js", "codigos-dados.js")

# Nas demos, os nomes genéricos dos códigos ("minha-foto.jpg") viram arquivos que existem no Catálogo.
# As demos ficam na pasta demos/, por isso os caminhos ganham "../".
TROCAS_DEMO = [
    ("img/minha-foto.jpg", "../img/foto-2.jpg"),
    ("img/foto-perfil.jpg", "../img/avatar.jpg"),
    ("img/capa-do-video.jpg", "../midia/poster.jpg"),
    ("img/foto-grande.jpg", "../img/foto-5.jpg"),
    ("img/foto-pequena.jpg", "../img/foto-5-pequena.jpg"),
    ("img/minha-imagem.png", "../img/mapa-formas.png"),
    ("img/capa.jpg", "../img/banner-largo.jpg"),
    ("../img/fundo.jpg", "../img/banner-largo.jpg"),
    ("midia/meu-video.mp4", "../midia/video-exemplo.mp4"),
    ("midia/minha-musica.mp3", "../midia/melodia.mp3"),
    ("midia/legendas.vtt", "../midia/legendas-pt.vtt"),
    ("docs/arquivo.pdf", "../docs/material-exemplo.pdf"),
    ("CODIGO-DO-VIDEO", "ok-plXXHlWw"),
    ('href="index.html"', 'href="../index.html"'),
    ('href="sobre.html"', 'href="../sobre.html"'),
    ('href="receitas.html"', 'href="#"'),
]

ROLAGEM = {"cabecalho", "submenu", "barra-progresso", "voltar-topo", "revelar"}
# Códigos que precisam ser a primeira coisa da página: a faixa da demo vai depois deles
FAIXA_DEPOIS = {"pular-conteudo"}

FAIXA_CSS = """
/* ---- Faixa da demo: NÃO faz parte do código do aluno ---- */
.demo-faixa {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px;
  margin: 0; padding: 10px 16px;
  background: #fff3c4; color: #3d2e00; border-bottom: 2px solid #e0b000;
  font: 14px/1.4 "Segoe UI", Arial, sans-serif; text-align: left;
}
.demo-faixa strong { font-weight: 700; }
.demo-faixa span { flex: 1; min-width: 220px; }
.demo-faixa a { color: #12324a !important; font-weight: 700; text-decoration: underline; }
.demo-recheio {
  margin: 32px 16px; padding: 16px; border: 2px dashed #b9c9d6; border-radius: 8px;
  color: #4f5f6f; font: 15px/1.5 "Segoe UI", Arial, sans-serif;
}
.demo-recheio.alto { min-height: 110vh; }
"""


def ler(caminho):
    if not os.path.exists(caminho):
        return None
    with open(caminho, encoding="utf-8") as arquivo:
        return arquivo.read()


def trocar_caminhos(texto):
    if not texto:
        return texto
    for antigo, novo in TROCAS_DEMO:
        texto = texto.replace(antigo, novo)
    # O que sobrou (img/foto-1.jpg etc.) só ganha o "../"
    texto = re.sub(r'(=")(img|midia|docs)/', r"\1../\2/", texto)
    return texto


def faixa(trecho):
    titulo = html_lib.escape(trecho["titulo"])
    exemplo = trecho.get("exemplo", "index.html")
    return (
        '<div class="demo-faixa" role="note">'
        f'<span><strong>Demo:</strong> {titulo}. Esta página tem só este código, colado num projeto em branco.</span>'
        f'<a href="../codigos.html">Todos os códigos</a>'
        f'<a href="../{exemplo}">Ver no Catálogo</a>'
        "</div>\n"
    )


def recheio(trecho_id):
    alto = " alto" if trecho_id in ROLAGEM else ""
    aviso = "Role a página para ver o efeito. " if trecho_id in ROLAGEM else ""
    blocos = []
    for secao, nome in (("sobre", "Sobre"), ("galeria", "Galeria"), ("contato", "Contato")):
        blocos.append(
            f'<section id="{secao}" class="demo-recheio{alto}"><h2>{nome}</h2>'
            f"<p>{aviso}Conteúdo de exemplo da demo, para os links com #{secao} terem para onde ir. "
            "Não faz parte do código.</p></section>"
        )
    return "\n".join(blocos)


def montar_demo(trecho, dados):
    tid = trecho["id"]
    html, css, js = trecho["html"] or "", trecho["css"] or "", trecho["js"] or ""
    cabeca_extra = ""

    requer = trecho.get("requer")
    if requer:
        base = dados["trechos"][requer]
        encaixe = trecho.get("encaixe")
        base_html = base["html"] or ""
        if encaixe and encaixe in base_html:
            recuo = "        "
            pedaco = "\n".join(recuo + linha if linha else linha for linha in html.strip("\n").split("\n"))
            html = base_html.replace(encaixe, pedaco + "\n" + encaixe, 1)
        else:
            html = base_html + "\n" + html
        css = (base["css"] or "") + "\n" + css
        js = (base["js"] or "") + "\n" + js

    if trecho.get("local") == "head":
        cabeca_extra = trocar_caminhos(html)
        html = (
            "<main style=\"padding:16px\"><h1>Título com a fonte nova</h1>"
            "<p>O texto da página usa a fonte do Google carregada no &lt;head&gt;. "
            "Olhe também o ícone na aba do navegador.</p></main>"
        )

    if tid == "estrutura":
        pagina = trocar_caminhos(html)
        pagina = pagina.replace('<link rel="stylesheet" href="css/estilo.css">', f"<style>\n{FAIXA_CSS}\n{css}\n</style>")
        pagina = pagina.replace('<script src="js/script.js" defer></script>', "")
        pagina = pagina.replace("<body>", "<body>\n" + faixa(trecho), 1)
        pagina = pagina.replace("</body>", f"<script>\n{js}\n</script>\n</body>", 1)
        return pagina

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Demo: {html_lib.escape(trecho["titulo"])}</title>
{cabeca_extra}
<style>
{FAIXA_CSS}
</style>
<style>
/* ===== CSS do código (aba CSS) ===== */
{trocar_caminhos(css)}
</style>
</head>
<body>
{"" if tid in FAIXA_DEPOIS else faixa(trecho)}
<!-- ===== HTML do código (aba HTML) ===== -->
{trocar_caminhos(html)}
{faixa(trecho) if tid in FAIXA_DEPOIS else ""}

<!-- ===== Conteúdo de exemplo da demo (não faz parte do código) ===== -->
{recheio(tid)}

<script>
/* ===== JavaScript do código (aba JavaScript) ===== */
{js}
</script>
</body>
</html>
"""


def main():
    with open(os.path.join(PASTA_TRECHOS, "indice.json"), encoding="utf-8") as arquivo:
        indice = json.load(arquivo)

    dados = {"ordem": [], "trechos": {}}
    for item in indice:
        pasta = os.path.join(PASTA_TRECHOS, item["id"])
        trecho = dict(item)
        trecho["html"] = ler(os.path.join(pasta, "codigo.html"))
        trecho["css"] = ler(os.path.join(pasta, "codigo.css"))
        trecho["js"] = ler(os.path.join(pasta, "codigo.js"))
        if not (trecho["html"] or trecho["css"] or trecho["js"]):
            raise SystemExit(f"O trecho '{item['id']}' não tem nenhum arquivo de código.")
        dados["ordem"].append(item["id"])
        dados["trechos"][item["id"]] = trecho

    cabecalho = (
        "/*\n"
        "  codigos-dados.js — GERADO AUTOMATICAMENTE, não edite à mão.\n"
        "  Os códigos vêm da pasta trechos/. Para mudar um código, edite o arquivo em trechos/\n"
        "  e rode:  python ferramentas/gerar-codigos.py\n"
        "*/\n"
    )
    with open(SAIDA, "w", encoding="utf-8", newline="\n") as arquivo:
        arquivo.write(cabecalho)
        arquivo.write("window.CODIGOS = ")
        json.dump(dados, arquivo, ensure_ascii=False, indent=1)
        arquivo.write(";\n")

    os.makedirs(PASTA_DEMOS, exist_ok=True)
    for arquivo_antigo in os.listdir(PASTA_DEMOS):
        if arquivo_antigo.endswith(".html"):
            os.remove(os.path.join(PASTA_DEMOS, arquivo_antigo))
    for tid in dados["ordem"]:
        with open(os.path.join(PASTA_DEMOS, tid + ".html"), "w", encoding="utf-8", newline="\n") as arquivo:
            arquivo.write(montar_demo(dados["trechos"][tid], dados))

    print(f"{len(dados['ordem'])} trechos gravados em js/codigos-dados.js")
    print(f"{len(dados['ordem'])} demos gravadas em demos/")


if __name__ == "__main__":
    main()

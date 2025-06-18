# Exemplos de uso e funcionamento do CHTML (Custom Hypertext Markup Language)
O arquivo [Explorer.html](./Game/Explorer.html) é um HTML customizado criado exclusivamente para este projeto. Para evitar confusões, chamamos esse HTML modificado de CHTML (Custom Hypertext Markup Language).

Ele é muito semelhante ao HTML convencional, mas possui algumas diferenças importantes.

O arquivo Explorer.html é um html modificado criado apenas para esse projetinho. Para evitar confusões, vamos 
nomear o HTML customizado pra `CHTMl` (Custom Hypertext Markup Language).

Ele é bem semelhante ao HTML comum mas existem diferenças:

## Tags
No `CHTML`, não existem tags certas ou erradas. você é livre para nomear como quiser.
As tags se comportam como em arquivos JSX/TSX, podendo ter fechamento automático ou não.

```HTML
    <Tag /> 
    <!--OU-->
    <Tag></Tag>
```

Também é possível adicionar comentários, exatamente como no HTML:

```HTML
    <!-- Este é um comentário -->

    <!--
        Este também
        é 
        um comentário
    -->
```

### Importante!
**Não existe suporte para textos dentro de tags**, apenas dentro de comentários.

```HTML
   <!-- Texto permitido aqui -->
    <Tag>Nada aqui</Tag> <!-- INCORRETO -->
```

Ou seja, dentro das tags só podem existir outras tags ou nada.

## Parâmetros
Os parâmetros são dinâmicos. Assim como as tags, não há restrições você pode criar quaisquer parâmetros.


* `id`: Único. Não deve haver dois elementos com o mesmo id. Por padrão, ele é gerado aleatoriamente.
* `class`: Pode ser repetida em várias tags, como no HTML convencional.
* `for`: Aponta para um id, indicando que a tag pertence ou se relaciona com aquele id.
* `repeat`: Seguido de um número, serve para repetir a tag X vezes.
* `src`: Usado para carregar assets.
* `script`: Exclusivo para scripts.
* `content`: Sem definição (reservado para uso futuro).
* `noProp` : Não cria um prop para o node (focado mais em organização).
* `name` : Usado juntamente com `src` pra definir o nome do asset (se não indicar o nome, o nome vai ser o mesmo do arquivo sem a extensão.)
* `x`, `y`, `w`, `h` e `z`: Definição de posição e tamanho.
* `href`: Usado para separar cenas em arquivos html, as citando em uma tag. (ao usar isso, o Node recebe o atributo "noProp")

* `title`: Define o titulo da pagina (Apenas nos nodes filos da raiz)
* `scene`: Define a cena inicial. (Apenas nos nodes filos da raiz)

### Parâmetros booleanos
Ao informar apenas o nome de um parâmetro, ele será interpretado como `true`.

Se quiser que o parâmetro seja `false`, basta usar uma exclamação antes do nome.

```HTML
    <Tag activated /> <!-- activated = true -->

    <Tag !activated /> <!-- activated = false -->
```

### Organização
Passando o `for` para um node pai, todos seu filhos (filho diretos) "herdam" esse atríbuto.
Ambos os códigos funcionam, mas o de cima é mais legível e recomendado.

```html
    <Player id="Player">

    <PlayerSources noProp for="Player">
        <Source src="scp-079.jpg" name="Idle" />
        <Source src="079_3.ogg" name="Voice" />
    </PlayerSources>
```

```html
    <Player id="Player">

    <Source src="scp-079.jpg" name="Idle" for="Player" />
    <Source src="079_3.ogg" name="Voice" for="Player" />
    
```


###### Anotações ( Dev )

- A tag "Scenes" deve estar na raiz ou dentro do primeiro elemento da raiz

- `repeat` ainda não existe





tags menionadas em código:
* `Root`: É o primeiro node(oculto) que encapsula os do projeto. O unico Node que não tem Node pai nem atributos.
* `Scene`: 
``
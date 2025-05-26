# Exemplos de uso e funcionamento do CHTML (Custom Hypertext Markup Language)
O arquivo Explorer.html é um HTML customizado criado exclusivamente para este projeto. Para evitar confusões, chamamos esse HTML modificado de CHTML (Custom Hypertext Markup Language).

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
Os parâmetros são dinâmicos. Assim como as tags, não há restrições — você pode criar quaisquer parâmetros.


* `id`: único. Não deve haver dois elementos com o mesmo id. Por padrão, ele é gerado aleatoriamente.
* `class`: pode ser repetida em várias tags, como no HTML convencional.
* `for`: aponta para um id, indicando que a tag pertence ou se relaciona com aquele id.
* `repeat`: seguido de um número, serve para repetir a tag X vezes.
* `src`: usado tanto para scripts quanto para outros assets.
* `script`: exclusivo para scripts.
* `content`: sem definição (reservado para uso futuro).

* `x`, `y`, `w`, `h` e `z`: definição de posição e tamanho.


### Parâmetros booleanos
Ao informar apenas o nome de um parâmetro, ele será interpretado como `true`.

Se quiser que o parâmetro seja `false`, basta usar uma exclamação antes do nome.

```HTML
    <Tag activated /> <!-- activated = true -->

    <Tag !activated /> <!-- activated = false -->
```
[![coverage](https://coveralls.io/repos/github/jnvm/zany/badge.svg?branch=master)](https://coveralls.io/github/jnvm/zany?branch=master)
[![build](https://travis-ci.org/jnvm/zany.svg?branch=master)](https://travis-ci.org/jnvm/zany)

# Zany Encoder

Encode & decode any text into any custom alphabet, multibyte code points supported.


## Install
```javascript
npm i zany
```

## Example

```javascript
var zany=require("zany")
	,{encode,decode}=zany(zany.block.EGYPTIAN_HIEROGLYPHS)//for example
	,message="secret message to encode!"
	,encoded=encode(message)//𓀍𓅆𓀀𓀌𓊷𓀀𓀂𓂳𓀀𓋡𓀀𓐌𓀀𓀘𓈔𓀀𓂇𓀀𓀂𓌂𓀀𓀋
	,decoded=decode(encoded)//===message
```

Characters grouped by [Unicode 9.0 blocks](https://github.com/mathiasbynens/unicode-9.0.0/tree/master/Block)
are available at `zany.block.*` via [lazy-unicode](https://www.npmjs.com/package/lazy-unicode).

## More Examples

```javascript
var zany=require("zany")
	,message="How now brown cow?"
	,alphabets={ //make up some alphabets
		 food:`🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍅🍠🍢🍣🍤🍥🍡🍦🍧🍨🍩🍪🎂🍰🍫🍬🍭🍮🍯`
		,faces:`😀😁😂😃😄😅😆😉😊😋😎😍😘😗😙😚🙂😐😑😶😏😣😥😮😪😫😌😛😜😝😒😓😔😕🙁😖😟😭😨😩😬😰😱😳😵😡😠😇`
		,animals:`🙈🐵🐒🐶🐕🐩🐺🐱🐈🐯🐅🐆🐴🐎🐮🐂🐃🐄🐷🐖🐗🐽🐑🐐🐫🐘🐭🐁🐀🐹🐰🐇🐿🐼🐾🐔🐤🐥🐦🐧🕊🕷`
		,whitespace:`             `
		,zwsp:`‪‭⁠⁡⁢⁣⁤⁦⁧⁨⁩⁪⁫⁬⁭⁮⁯𛲠𛲡𛲢𛲣𝅳𝅴𝅵𝅶𝅷𝅸𝅹𝅺󠀁`
		//or use predefined blocks
		,futhark  :zany.block.RUNIC
		,cuneiform:zany.block.CUNEIFORM
		,cards    :zany.block.PLAYING_CARDS
		,dominoes :zany.block.DOMINO_TILES
		,boxes    :zany.block.BOX_DRAWING
		,braille  :zany.block.BRAILLE_PATTERNS//(note this does not make READABLE braille!)
		,zalgo    :zany.block.ZALGO
	}
for(var i in alphabets){
	var {encode,decode}=zany(alphabets[i])
		,e=encode(message)
		,d=decode(`characters not part ${e} of the original alphabet will be discarded`)
	console.log(`${i}(${alphabets[i].length}):${e}//${d}`)
}
/*outputs:
food(64):🍉🍎🍅🍇🍉🍤🍌🍋🍇🍊🍊🍇🍉🍈🍧🍩🍇🍉🍍🍌🍇🍒🍣🍩🍇🍥🍡🍏🍇🍢🍧🍏🍇🍊🍌🍎🍌//How now brown cow?
faces(96):😫😔😀😣😪🙁😀😂😑😀😙😭😫😀😪😬😀😅😛😬😀😊😓😒😀😉😑😝😀😝😨😌//How now brown cow?
animals(84):🐹🐴🙈🐁🐧🐇🙈🐒🐫🙈🐖🐩🐴🙈🐀🐮🙈🐱🐵🐴🙈🐆🐶🐆🙈🐯🐃🐖🙈🐦🐔🐭//How now brown cow?
whitespace(13):                                            //How now brown cow?
zwsp(43):⁠⁪󠀁‪⁠𝅷𝅷𝅸‪⁡⁦‪⁠⁧⁤⁬‪⁠⁩𛲢‪⁬‭⁤‪𝅳⁡𝅷‪𛲠𝅴𛲠‪⁡𛲡𛲢𛲣//How now brown cow?
futhark(97):ᚭᚨᚠᚥᛸᛯᚠᛡᚠᚤᚾᚢᚠᚬᛡᚠᚢᚪᚲᚠᚢᛱᚧᚠᚢᛓᛢᚠᚧᛷᛡ//How now brown cow?
cuneiform(2050):𒀂𒂈𒀀𒀭𒃯𒀀𒁁𒀀𒀞𒋢𒀀𒀂𒁡𒀀𒀊𒍲𒀀𒀑𒈇𒀀𒀎𒌂𒀀𒀿𒂁//How now brown cow?
cards(194):🂭🂨🂠🂥🃸🃯🂠🃡🂠🂤🂾🂢🂠🂬🃡🂠🂢🂪🂲🂠🂢🃱🂧🂠🂢🃓🃢🂠🂧🃷🃡//How now brown cow?
dominoes(226):🀻🁘🀰🀴🁵🁟🀰🁱🀰🀳🁠🂂🀰🀻🀱🀰🂋🁂🀰🀲🁗🂗🀰🀲🀾🂂🀰🀶🀹🀱//How now brown cow?
boxes(129):┊┈─┃╢╯─╁─│╮╢─┉╡─╏╲─│┅┇─╯│─┄╲━//How now brown cow?
braille(257):⠅⢈⠀⢱⣯⠀⡁⠀⡷⣢⠀⠅⡡⠀⠨⡲⠀⡃⠇⠀⠸⠂⠀⣹⢁//How now brown cow?
zalgo(125):̯̊͏᷊̦̃͏̈́͏̹̂︡͏̊̅͏͖̹͏̪̂̍͏͉᷆͏̅̓̅//How now brown cow?
*/
```



Or, if you have too many friends, define a semantic whitespace decoder in one file:
```javascript
\u1160=x=>eval(zany(`‪‭⁠⁡⁢⁣⁤⁦⁧⁨⁩⁪⁫⁬⁭⁮⁯𛲠𛲡𛲢𛲣𝅳𝅴𝅵𝅶𝅷𝅸𝅹𝅺󠀁`).decode(x))
```
Then somewhere, far, far away that shares scope, execute it:
```javascript
ᅠ`⁠⁯⁪‪⁮𝅹⁦‪⁡⁧⁢‪⁡⁣𝅶𝅶‪𛲠⁭⁠‪⁠‭⁦⁯‪⁭𝅹‪⁯⁤⁮‪⁠𛲣⁠𛲣‪𛲡𝅵⁡‪⁠⁪⁦𝅸‪⁨𛲢‪⁣𝅹⁫‪⁠⁪𛲠𛲢‪𛲡⁠⁬‪⁡⁪⁦𛲣‪⁮𛲡𝅵‪⁣𝅸⁯‪⁩𝅵⁠‪⁠⁪𝅸⁭‪⁡⁡𝅸𛲡‪⁩𝅶𛲠‪⁠𝅶⁦⁦‪⁮𛲢⁣‪⁠𛲣⁭𝅺‪⁠⁨‪𛲡⁠⁪‪𝅷⁪𛲠‪⁬⁩⁯‪⁫𝅵⁢‪⁠⁪⁧‭‪⁪𛲣𛲢‪⁠⁮⁠‭‪⁠𛲢⁩‪𛲣⁯⁧‪⁠‭𝅶⁫‪⁡⁡⁦⁬‪⁠𝅳𝅹𝅴`
```
Too obvious? How about now?
```javascript
(()=>{ᅠ
`use strict⁠⁯⁪‪⁮𝅹⁦‪⁡⁧⁢‪⁡⁣𝅶𝅶‪𛲠⁭⁠‪⁠‭⁦⁯‪⁭𝅹‪⁯⁤⁮‪⁠𛲣⁠𛲣‪𛲡𝅵⁡‪⁠⁪⁦𝅸‪⁨𛲢‪⁣𝅹⁫‪⁠⁪𛲠𛲢‪𛲡⁠⁬‪⁡⁪⁦𛲣‪⁮𛲡𝅵‪⁣𝅸⁯‪⁩𝅵⁠‪⁠⁪𝅸⁭‪⁡⁡𝅸𛲡‪⁩𝅶𛲠‪⁠𝅶⁦⁦‪⁮𛲢⁣‪⁠𛲣⁭𝅺‪⁠⁨‪𛲡⁠⁪‪𝅷⁪𛲠‪⁬⁩⁯‪⁫𝅵⁢‪⁠⁪⁧‭‪⁪𛲣𛲢‪⁠⁮⁠‭‪⁠𛲢⁩‪𛲣⁯⁧‪⁠‭𝅶⁫‪⁡⁡⁦⁬‪⁠𝅳𝅹𝅴`
//regular code la la la
})()
```
Good thing `use strict` is only meaningful within `"` or `'`!

## How it Works

Your message
&rarr; [pieroxy's Lempel-Ziv](https://www.npmjs.com/package/lz-string)
&rarr; code points<sub>10</sub>
&rarr; characters<sub>input alphabet</sub> delimited by 1st item

Encoding throws out repeat code points in the given alphabet.

Decoding throws out code points not in the encoding alphabet.

## Why do this?
Why are Egyptian hieroglyphics valid javascript variable names?

The answer is don't think about it.
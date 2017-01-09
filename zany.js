var lz=require("lz-string")
	,lazyUnicodeBlocks=require("lazy-unicode")

function base2base(srcAlphabet, dstAlphabet) {
	/* modification of github.com/HarasimowiczKamil/any-base to:
		* support multibyte
		* enforce unique alphabets
	*/	
	var  noDifference = srcAlphabet === dstAlphabet
		,srcAlphabet = Array.from(new Set((srcAlphabet).match(/./gu)))
		,dstAlphabet = Array.from(new Set((dstAlphabet).match(/./gu)))
		,fromBase = srcAlphabet.length
		,toBase = dstAlphabet.length
		
	return number=>{
		if(noDifference) return number

		number = (number + '').match(/./gu)
		
		var i, divide, newlen
			,length = number.length
			,result = ''
			,numberMap = {}
		
		for(i = 0; i < length; i++)
			numberMap[i] = srcAlphabet.indexOf(number[i])
				
		do {
			divide = 0
			newlen = 0
			for(i = 0; i < length; i++) {
				divide = divide * fromBase + numberMap[i]
				if(divide >= toBase) {
					numberMap[newlen++] = parseInt(divide / toBase, 10)
					divide = divide % toBase
				}
				else if(newlen)
					numberMap[newlen++] = 0
			}
			length = newlen
			result = dstAlphabet[divide] + result
		} while (newlen != 0)
	
		return result
	}
}
function makeCoders(alphabet){
	alphabet=alphabet.match(/./gu)
	
	if(alphabet.length<3)
		throw new Error("Destination alphabet must be at least 3 character")

	var original=new Set(alphabet)
		,sep=alphabet.shift()
		,BX="0123456789"
		,BY=alphabet.join("")
		,BXtoBY=base2base(BX,BY)
		,BYtoBX=base2base(BY,BX)

	return {
		 encode(text=""){
			return lz.compress(text).split("")
				.map(x=>BXtoBY(x.codePointAt(0)))
				.join(sep)
		}
		,decode(code=""){
			return lz.decompress(
				code.match(/./gu)
				//take out any characters not in original alphabet
				.filter(c=>original.has(c))
				.join("")
				.split(sep)
				.map(c=>String.fromCodePoint(BYtoBX(c)))
				.join("")
			)
		}
	}
}

makeCoders.block=Object.assign(lazyUnicodeBlocks,{ZALGO:[847
			,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785
			,787,788,789,790,791,792,793,794
			,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846
			,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879
			,7616,7617,7618,7619,7620,7621,7622,7623,7624,7625,7626,7678,7679
			,65056,65057,65058,65059]
		.map(x=>String.fromCodePoint(x))
		.join("")
	})

module.exports=makeCoders
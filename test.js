var test=require("tape")
	,zany=require("./zany.js")
	,fs=require("fs")
	,msg1=`GUARD #1:  Halt!  Who goes there?\n  ARTHUR:  It is I, Arthur, son of Uther Pendragon, from the castle\n      of Camelot.  King of the Britons, defeator of the Saxons, sovereign\n      of all England!\n  GUARD #1:  Pull the other one!\n  ARTHUR:  I am.  And this my trusty servant Patsy.\n      We have ridden the length and breadth of the land in search of knights\n      who will join me in my court of Camelot.  I must speak with your lord\n      and master.\n  GUARD #1:  What, ridden on a horse?\n  ARTHUR:  Yes!\n  GUARD #1:  You're using coconuts!\n  ARTHUR:  What?\n  GUARD #1:  You've got two empty halves of coconut and you're bangin'\n      'em together.\n  ARTHUR:  So?  We have ridden since the snows of winter covered this\n      land, through the kingdom of Mercea, through--\n  GUARD #1:  Where'd you get the coconut?\n  ARTHUR:  We found them.\n  GUARD #1:  Found them?  In Mercea?  The coconut's tropical!\n  ARTHUR:  What do you mean?\n  GUARD #1:  Well, this is a temperate zone.\n  ARTHUR:  The swallow may fly south with the sun or the house martin\n      or the plumber may seek warmer climes in winter yet these are not\n      strangers to our land.\n  GUARD #1:  Are you suggesting coconuts migrate?\n  ARTHUR:  Not at all, they could be carried.\n  GUARD #1:  What -- a swallow carrying a coconut?\n  ARTHUR:  It could grip it by the husk!\n  GUARD #1:  It's not a question of where he grips it!  It's a simple\n      question of weight ratios!  A five ounce bird could not carry a 1 pound\n      coconut.\n  ARTHUR:  Well, it doesn't matter.  Will you go and tell your master\n      that Arthur from the Court of Camelot is here.\n  GUARD #1:  Listen, in order to maintain air-speed velocity, a swallow\n      needs to beat its wings 43 times every second, right?\n  ARTHUR:  Please!\n  GUARD #1:  Am I right?\n  ARTHUR:  I'm not interested!\n  GUARD #2:  It could be carried by an African swallow!\n  GUARD #1:  Oh, yeah, an African swallow maybe, but not a European\n      swallow, that's my point.\n  GUARD #2:  Oh, yeah, I agree with that...\n  ARTHUR:  Will you ask your master if he wants to join my court\n      at Camelot?!\n  GUARD #1:  But then of course African swallows are not migratory.\n  GUARD #2:  Oh, yeah...\n  GUARD #1:  So they couldn't bring a coconut back anyway...\n      [clop clop]\n  GUARD #2:  Wait a minute -- supposing two swallows carried it together?\n  GUARD #1:  No, they'd have to have it on a line.\n  GUARD #2:  Well, simple!  They'd just use a standard creeper!\n  GUARD #1:  What, held under the dorsal guiding feathers?\n  GUARD #2:  Well, why not?`
	,msg2=" ".repeat(20000).split("").map((x,i)=>String.fromCodePoint(131072+i%500)).join("")
	,ellipsize=s=> s.length > 20 ? s.substring(0,20)+"..." : s
	
test('invalid alphabets', t=>{
	t.throws(()=>zany(  ),'fail if alphabet is absent')
	t.throws(()=>zany(""),'fail if alphabet is of length 0')
	t.throws(()=>zany("1"),'fail if alphabet is too small')
	t.end()
})

test('decode(encode(msg)==msg for alphabets:', t=>{
	
	;["abcdefg"
	,".:;"
	,".0123456789"
	,"🗯☺️😈😀👵😂👼🙈👩‍❤️‍💋‍👩👨‍❤️‍👨🙃😞😣😰😥😛"
	," ".repeat(  94).split("").map((x,i)=>String.fromCodePoint( 11264+i)).join("")
	," ".repeat( 500).split("").map((x,i)=>String.fromCodePoint(100000+i)).join("")
	," ".repeat(6191).split("").map((x,i)=>String.fromCodePoint( 13312+i)).join("")
	,zany.block.ZALGO
	,zany.block.EMOTICONS
	].forEach(alphabet=>{
		var {encode,decode}=zany(alphabet)
		t.equal(decode("!@#"+encode(msg1)),msg1,'msg1 w: '+ellipsize(alphabet))
		t.equal(decode(encode(msg2)),msg2,'msg2 w: '+ellipsize(alphabet))
	})

	t.end()
});
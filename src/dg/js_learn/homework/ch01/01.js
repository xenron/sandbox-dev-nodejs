// 层数
var n=5;
for(var i=1; i<=n; i++)
{
	var content = "";
    for(var j=1; j<=2*n-1; j++)
    {
        if(j<=(n-i) || j>=(n+i) || content.substr(content.length - 1) == "*"){
            content = content + " ";
     	}
    	else 
    	{
            content = content + "*";
    	}
    }
    console.log(content);
}
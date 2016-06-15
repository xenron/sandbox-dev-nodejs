process.on('message', function(m) {

	var filename	= m.file;
    var rmin		= m.rmin;
    var rmax		= m.rmax;

    var sed = "sed -n '" + m.offsetStart + "," + m.offsetEnd + "p' " + filename;

	var accumulatedColumns	= [];

    var reader = require('child_process').exec(sed, {
    	maxBuffer 	: 1024 * 1000000
    }, function(err, data, stderr) {

        if(err) {
            throw new Error(err);
        }

        data = data.split("\n");

        var range 		= [];
        var outliers	= {
            under	: 0,
            over	: 0
        };

        var i	= data.length;
        var x	= rmax;
        
        var rlen;
        var n;
        var end;
        var row;

        //	Initialize #range with zeros(0)
        //
        do {
            range[x--] = 0;
        } while(x >= rmin);

        //	Fetching each row, splitting on comma grab timestamp and execution time,
        //	fill #range with exec time values, keying on exec time (note that this may mean a
        //	sparse array), and storing any exec times rmin <> rmax in #outliers[under || over].
        //
        while(i--) {

            row = data[i].split(",");
            rlen = row.length;

            n = +row[1];

			//	Ensure we have a number
			//
            if(!isNaN(n)) {

                if(!end) {
                    end =  +row[0];
                }

                if(range[n] !== void 0) {
                    range[n]++
                } else {
                    if(n < rmin) {
                        outliers.under++;
                    } else {
                        outliers.over++;
                    }
                }
            } 
        }

		process.send({
			range       		: range,
			outliers    		: outliers,
			start       		: +row[0],
			end         		: end,
			accumulatedColumns	: accumulatedColumns
		});

		process.exit();

    });
});




'use strict'

const Data = use('App/Models/Document')
const Database = use('Database')

class UpdateController {
    constructor() {
        this.data = {};
        this.total = [];
        this.type;
        this.key = "";
    }

    async index(request, response) {
        let cnt = 186;
        let monthNum = 5;
        for(let i=175; i <= cnt; i++) {
            let week = i%2===0?"네째주":"둘째주";
            let month = `${monthNum}월`;
            if(i%2===0) {
                monthNum ++;
            }
            let test = {
                "title":`19년 ${month} ${week}`,
                "register_number": `제 ${i}호`,
                "file": `http://img1.famtimes.co.kr/static/magazine/pdf_${i}.pdf`,
                "m_img":`http://img1.famtimes.co.kr/site6/20190522/m/maga_${i}.jpeg`,
                "xl_img":`http://img1.famtimes.co.kr/site6/20190522/m/maga_${i}.jpeg`,
                "created_at": new Date()
            }
            const result = await Database
            .table('ns_magazine')
            .insert(test);
        }
    }

    async updateData(idx) {
        
        
    }

    setEachCustomData(result) {
        result.map((val, key) => {
            this.updateData(key);
        });
    }

    byPassToLoop(data) {
        let _this = this;
        let pageData = data;
        let layoutData;
        layoutData = pageData.subViews;
        _this.Loop(layoutData);
    }


    Loop(data) {
        let _this = this;
        // let changList = [{
        //         "before": "fal fa-search",
        //         "after": "icon-search"
        //     },
        //     {
        //         "before": "fas fa-search",
        //         "after": "icon-search"
        //     },
        //     {
        //         "before": "fal fa-print",
        //         "after": "icon-print"
        //     },
        //     {
        //         "before": "fal fa-bars",
        //         "after": "icon-menu"
        //     },
        //     {
        //         "before": "fal fa-times",
        //         "after": "icon-cancel"
        //     },
        //     {
        //         "before": "fal fa-times",
        //         "after": "icon-cancel"
        //     },
        //     {
        //         "before": "fal fa-envelope",
        //         "after": "icon-mail"
        //     },
        //     {
        //         "before": "fas fa-play-circle",
        //         "after": "icon-play-circled"
        //     },
        //     {
        //         "before": "fab fa-facebook-f",
        //         "after": "icon-facebook"
        //     },
        //     {
        //         "before": "fab fa-twitter",
        //         "after": "icon-twitter"
        //     },
        //     {
        //         "before": "fal fa-blog",
        //         "after": "icon-blogger"
        //     }
        // ]
        data.map((val, key) => {
            // if(val.output === "{view_date_ebg}") {
            //     val.output = "{view_custom_date}";
            //     console.log("changed");
            //     // val.output = "{view_custom_date}"
            // }

            if(val.slots === "Feed-NormalType-ssd") {
                console.log("ok");
                
                val.dataSource.dataType = "news";
            }
            // if (val.dataSource !== undefined) {
            //     if(val.dataSource.idx.length > 0){
            //         val.dataSource.idx.map((value,index) => {
            //             console.log(value.type);
            //         });
            //     }
            // }

            if (val.subViews) {
                _this.Loop(val.subViews);
            }
        });
    };
}

module.exports = UpdateController;
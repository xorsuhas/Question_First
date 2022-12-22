const apps = [
    { id: 1, title: 'Lorem', published: true, userId: 123 },
    { id: 2, title: 'Ipsum', published: false, userId: 123 },
    { id: 3, title: 'Dolor', published: true, userId: 456 },
    { id: 4, title: 'Sit', published: true, userId: 789 },
    { id: 5, title: 'Amet', published: false, userId: 123 },
    { id: 6, title: 'Et', published: true, userId: 123 }
  ],

getFilterData = (filterQuery) => {
    let resultReturn = {};
    // fs.readFile('../ORM_QUERY/data/sampleData.json', "utf8", async (err, respData) => {
    //     if (err) {
    //       console.log("File read failed:", err);
    //       return;
    //     }
    //     const convertData = JSON.parse(respData);
    //     resultReturn = await processData(apps, filterQuery);
    //   });
    resultReturn = processData(apps, filterQuery);
    return resultReturn;
}

const processData = (data, filterQuery) =>{
    // console.log("data in process fn", data.apps)
    const userfilter = filterQuery;
    const filterApps = data.apps;
    // const result = _.filter( filterApps, { title: 'Lorem' } );
     _.mixin({
        'filterByValues': function (filterApps, key, values) {
            return _.filter(filterApps, function (o) {
                return _.includes(values.filter((val)=> val), resolveKey(o, key));
            });
        }
    });
    const resolveKey = (o, key) =>{
        console.log("o key in resolve key", o, key);
        return o.id === key[0] && o.title === key[1] && o.published === key[2]
    }
    const result =  _.filterByValues(filterApps, ["id", "title", "published"], [1,'Lorem', true]);
    console.log("result", result);
}

getFilterData();

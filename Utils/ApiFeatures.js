class ApiFeatures {
    constructor(query, queryString, modelObj) {
        this.query = query;
        this.queryString = queryString;
        this.modelSchemaObj = modelObj;
    }

    filter(){
        let movieModelFields = this.modelSchemaObj.obj;
        let queryObj = { ...this.queryString }
        let queryObjFields = Object.keys(queryObj);
        queryObjFields.forEach((field) => {
            movieModelFields[field] ? null : delete queryObj[field];
        });
        
        // console.log(queryObj, " queryObj");
        // console.log(this.query, " queryObj");
        // console.log(this.queryString, " queryString");
        // console.log(this.modelSchemaObj, " modelSchemaObj");
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|eq)\b/g, (match) => { return `$${match}` });
        queryStr = JSON.parse(queryStr);
        // console.log(queryStr, " queryStr");
        this.query = this.query.find(queryStr);

        return this;
    }

    sort(){
        if (this.queryString.sort) {
            let sortQuery = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortQuery);
        } else {
            this.query = this.query.sort('createdAt');
        }

        return this;
    }

    selectedFields(){
        if (this.queryString.fields) {
            let selectFields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(selectFields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate(){
        let page = this.queryString.page || 1;
        let limit = this.queryString.limit || 10;
        let skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        
        // if (req.query.page) {
        //     const numMovies = await Movie.NewmovieSchema.countDocuments();
        //     if (skip >= numMovies) throw new Error('This page does not exist');
        // } 
        return this;
    }
}

module.exports = ApiFeatures;
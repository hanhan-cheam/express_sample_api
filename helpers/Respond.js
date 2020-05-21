const getdata = (data, pagination) =>{
    return format(data, null, pagination)
}
const reply = (res, data) => {
    return res.status(200).json(getdata(data))
}
const error = (input, debug) => {
    let error = {
            code: input.code, 
            data: input.data
    }
    return format(null, error, null, debug)
}
const err = (res, code, data, e) => {
    return res.status(200).json(error({
        code: code,
        data: data
    }, e))
}
const format = (data=null, error=null, pagination=null, debug=null) =>{
    return {
        data: data,
        error: error,
        pagination: pagination,
        debug: debug
    }
}


module.exports = {
    getdata,
    reply,
    error,
    err,
    format,
}
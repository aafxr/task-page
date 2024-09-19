import {util} from './util'
import {fileReader} from './fileReader'

export const ajax = {}

ajax.prepareData = function(arData, prefix, callback)
{
    let data = '', objects = [];
    if (util.type.isString(arData) || arData == null)
    {
        callback.call(document, arData||'');
    }
    else
    {
        for(let i in arData)
        {
            if (!arData.hasOwnProperty(i))
            {
                continue;
            }

            let name = ajax.escape(i);

            if(prefix)
                name = prefix + '[' + name + ']';

            if(typeof arData[i] == 'object')
            {
                objects.push([name,arData[i]]);
            }
            else
            {
                if (data.length > 0)
                {
                    data += '&';
                }

                data += name + '=' + ajax.escape(arData[i])
            }
        }

        let cnt = objects.length;
        if(cnt > 0)
        {
            let cb = function(str)
            {
                data += (!!str ? '&' : '') + str;
                if(--cnt <= 0)
                {
                    callback.call(document, data)
                }
            }

            let cnt1 = cnt;
            for(let i = 0; i < cnt1; i++)
            {
                if(util.type.isDomNode(objects[i][1]))
                {
                    if(objects[i][1].tagName.toUpperCase() == 'INPUT' && objects[i][1].type == 'file')
                    {
                        if(fileReader.canUse())
                        {
                            fileReader(objects[i][1], (function(name){
                                return function(result){
                                    if(util.type.isArray(result)&&result.length>0)
                                    {
                                        cb(name + '[0]=' + ajax.escape(result[0]) + '&' + name + '[1]=' + ajax.escape(result[1]));
                                    }
                                    else
                                    {
                                        cb(name+'=');
                                    }
                                }
                            })(objects[i][0]));
                        }
                    }
                    else if(typeof objects[i][1].value != 'undefined')
                    {
                        cb(objects[i][0] + '=' + ajax.escape(objects[i][1].value));
                    }
                    else
                    {
                        cb('');
                    }
                }
                else if(util.type.isDate(objects[i][1]))
                {
                    cb(objects[i][0] + '=' + ajax.escape(objects[i][1].toJSON()));
                }
                else if(util.type.isArray(objects[i][1]) && objects[i][1].length <= 0)
                {
                    cb(objects[i][0] + '=');
                }
                else
                {
                    ajax.prepareData(objects[i][1], objects[i][0], cb);
                }
            }
        }
        else
        {
            callback.call(document, data)
        }
    }
};


ajax.escape = function(str)
{
    return encodeURIComponent(str);
};
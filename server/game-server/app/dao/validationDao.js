var logger = require('../lib/logger').getLogger(__filename);
var pomelo = require('pomelo');
var async = require('async');
var knex = require('knex');
var moment = require('moment');

var Validation = require('../domain/validation');
var utils = require('../util/utils');

var validationDao = module.exports;

//=============================================================  Get Function  =============================================================
/**
 * Get an Validation by phone and type
 * @param {String} phone
 * @param {int} type
 * @param {function} cb Callback function.
 */
validationDao.getValidation = function (phone, type, cb) {
    let sql = knex.select('*')
        .from('Validation')
        .where('phone', phone)
        .andWhere('type', type).toString();

    pomelo.app.get('dbclient').query(sql, function (err, res) {
        if (err) {
            utils.invokeCallback(cb, err.message, null);
        } else if (!res || res.length <= 0) {
            utils.invokeCallback(cb, null, null);
        } else {
            var validation = new Validation(res[0]);
            utils.invokeCallback(cb, null, validation);
        }
    });
};

//=============================================================  Create Function  =============================================================
/**
 * Create an Validation phone and type
 * @param {String} phone
 * @param {int} type
 * @param {String} code
 * @param {function} cb Callback function.
 */
validationDao.insertValidation = function (phone, type, code, cb) {
    validationDao.checkValidationExist(phone, type, function (err, count) {
        if (err !== null) {
            utils.invokeCallback(cb, { code: err.number, msg: err.message }, null);
        } else {
            var validation = new Validation({ phone: phone, type: type, value: code, createTime: moment().unit() });
            if (count > 0) {
                validationDao.updateValidation(validation, function (err) {
                    if (err !== null) {
                        utils.invokeCallback(cb, { code: err.number, msg: err.message }, null);
                    } else {
                        utils.invokeCallback(cb, null, validation);
                    }
                });
            } else {
                let sql = knex('Validation').insert(validation).toString();
                pomelo.app.get('dbclient').insert(sql, function (err, res) {
                    if (err !== null) {
                        utils.invokeCallback(cb, { code: err.number, msg: err.message }, null);
                    } else {
                        utils.invokeCallback(cb, null, validation);
                    }
                });
            }
        }
    });
};
//=============================================================  Update Function  =============================================================

/**
 * Check Validation exist
 * @param {String} phone
 * @param {int} type
 * @param {String} code
 * @param {function} cb
 */
validationDao.updateValidation = function (validation, cb) {
    if (null == validation) {
        utils.invokeCallback(cb, { code: 1, msg: 'validation is null' });
        return;
    }
    let sql = knex('Validation').update({ value: validation.code, createTime: validation.createTime }).where({ 'phone': validation.phone, 'type': validation.type }).toString();
    pomelo.app.get('dbclient').update(sql, function (err, res) {
        if (err !== null) {
            utils.invokeCallback(cb, { code: err.number, msg: err.message });
        } else {
            utils.invokeCallback(cb, null);
        }
    });
}

//=============================================================  Check Function  =============================================================
/**
 * Check Validation exist
 * @param {String} phone
 * @param {int} type
 * @param {function} cb
 */
validationDao.checkValidationExist = function (phone, type, cb) {
    let sql = knex('Validation').count({ count: 'value' }).where('phone', phone).andWhere('type', type).toString();
    pomelo.app.get('dbclient').query(sql, function (err, res) {
        if (err !== null) {
            utils.invokeCallback(cb, { code: err.number, msg: err.message }, 0);
        } else {
            utils.invokeCallback(cb, null, res[0].count);
        }
    });
}
'use strict';

const qiniu = require('qiniu');
const Controller = require('egg').Controller;

class CommonController extends Controller {
  async getQiNiuToken() {
    const { ctx } = this;
    const accessKey = 'MRs-40VRc9LQMu5F3Rd_PT1KyikAz_VdvdfypgNP';
    const secretKey = 'ugMC2TUm0ilGRYzyTa18V4F6s5VXYyALQaHm8AMa';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    // 配置
    const options = {
      scope: 'codefamer',
      // returnUrl:
      // expires: 7200,
    };
    try {
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const token = putPolicy.uploadToken(mac);
      ctx.helper.responseSuccessHelper({ data: token });
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
}

module.exports = CommonController;

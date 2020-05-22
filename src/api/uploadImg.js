/**
 * 上传图片的方法
 * ***/

import request from '@/utils/request'

export function uploadImg (data) {
  return request({
    url: 'user/photo',
    method: 'patch',
    data
  })
}

import requests
import json
import os,sys


def upload(image_file):
    '''
    上传图片到sm.ms图床，返回data字典
    '''
    # 这里可以写sm.ms图床的用户秘钥，不写也可以，但是会追踪不到图片的位置
    # headers = {'Authorization': '{sm.ms的图床秘钥}'}
    files = {'smfile': image_file}
    url = 'https://sm.ms/api/v2/upload'

    res = requests.post(url, files=files, headers=headers).json()
    print(json.dumps(res, indent=4))
    print(res)
    print(res['data']['url'])
    return res['data']

import requests
import json
import os,sys


def upload(image_file):
    '''
    上传图片到sm.ms图床，返回data字典
    '''
    headers = {'Authorization': 'COdRYuAu1MKqB8oYT6WTgxpmxDWyjelV'}
    files = {'smfile': image_file}
    url = 'https://sm.ms/api/v2/upload'

    res = requests.post(url, files=files, headers=headers).json()
    print(json.dumps(res, indent=4))
    print(res)
    print(res['data']['url'])
    return res['data']

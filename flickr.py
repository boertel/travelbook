import json
import requests
import random


API_URL = 'https://api.flickr.com/services/rest/'
API_KEY = '9dcd12a3bcb52f075b348d24362f960c'
user_id = '91324803@N06'
photoset_id = '72157665415084982'      # newyork
photoset_id = '72157663615692933'   # Hong kong

def photo_source_url(photo, size=None, extension='jpg'):
    base = 'https://farm%(farm)s.staticflickr.com/%(server)s/%(id)s_%(secret)s'

    if size is not None:
        base += '_%s' % size

    base += '.%s' % extension
    return base % photo

def interesting(photo):
    attributes = ['farm', 'server', 'id', 'secret', ]
    output = { key: value for key, value in photo.iteritems() if key in attributes }
    output['type'] = 'flickr'
    return {
            "type": "image",
            'args': {
                'date_taken': photo['datetaken'],
                'caption': "",
                'credit': "",
                'width': photo['width_o'],
                'height': photo['height_o'],
                'src': output
            }
        }

def get(method, params):
    params.update({
        'method': 'flickr.%s' % method,
        'api_key': API_KEY,
        'user_id': user_id,
        'format': 'json',
        'nojsoncallback': 1
    })
    return requests.get(API_URL, params=params).json()

def create_images(images):
    return {
            "type": "images",
            "args": {},
            "children": images
            }

if __name__ == '__main__':
    response = get('photosets.getPhotos', {'photoset_id': photoset_id, 'extras': 'o_dims,url_o,date_taken'})
    i = 0
    out = []
    images = []
    for photo in response['photoset']['photo']:
        images.append(interesting(photo))
        if i > random.randint(0, 4):
            out.append(create_images(images))
            images = []
            i = 0
        i += 1
    print json.dumps({'type': 'root', 'children': out})

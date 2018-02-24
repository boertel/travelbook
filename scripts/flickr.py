import json
import requests


API_URL = 'https://api.flickr.com/services/rest/'
API_KEY = '9dcd12a3bcb52f075b348d24362f960c'
user_id = '91324803@N06'
# go to: https://www.flickr.com/services/api/explore/flickr.collections.getInfo
#photoset_id = '72157665415084982'      # newyork
photoset_id = '72157686131556576'


def photo_source_url(photo, size=None, extension='jpg'):
    base = 'https://farm%(farm)s.staticflickr.com/%(server)s/%(id)s_%(secret)s'

    if size is not None:
        base += '_%s' % size

    base += '.%s' % extension
    return base % photo


def interesting(photo):
    attributes = ['farm', 'server', 'id', 'secret', 'originalsecret']
    output = { key: value for key, value in photo.iteritems() if key in attributes }
    output['type'] = 'flickr'
    return output


def get(method, params):
    params.update({
        'method': 'flickr.%s' % method,
        'api_key': API_KEY,
        'user_id': user_id,
        'format': 'json',
        'nojsoncallback': 1,
        'per_page': 150,
        'extras': 'o_dims,url_o,original_format',
    })
    return requests.get(API_URL, params=params).json()


if __name__ == '__main__':
    response = get('photosets.getPhotos', {'photoset_id': photoset_id})
    out = []
    for photo in response['photoset']['photo']:
        out.append({'src': interesting(photo), 'width': int(photo['width_o']), 'height': int(photo['height_o'])})
    print json.dumps(out)

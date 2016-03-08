import json
import requests


API_URL = 'https://api.flickr.com/services/rest/'
API_KEY = '9dcd12a3bcb52f075b348d24362f960c'
user_id = '91324803@N06'
photoset_id = '72157665415084982'      # newyork

def photo_source_url(photo, size=None, extension='jpg'):
    base = 'https://farm%(farm)s.staticflickr.com/%(server)s/%(id)s_%(secret)s'

    if size is not None:
        base += '_%s' % size

    base += '.%s' % extension
    return base % photo

def interesting(photo):
    attributes = ['farm', 'server', 'id', 'secret']
    return { key: value for key, value in photo.iteritems() if key in attributes }

def get(method, params):
    params.update({
        'method': 'flickr.%s' % method,
        'api_key': API_KEY,
        'user_id': user_id,
        'format': 'json',
        'nojsoncallback': 1
    })
    return requests.get(API_URL, params=params).json()


if __name__ == '__main__':
    response = get('photosets.getPhotos', {'photoset_id': photoset_id})
    for photo in response['photoset']['photo']:
        print photo['title'], json.dumps(interesting(photo))


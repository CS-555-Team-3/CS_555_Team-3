from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from random import randrange
from pydub import AudioSegment
from pydub.playback import play
from django.http import FileResponse

import pathlib
# view acts as a controller in Django, we process program logic here


@api_view(["GET"])
def getSounds(request, notes, durations):
    # this endpoint receives two query params: notes and durations
    # TODO: color corresponds to sound notes needs to be decided, then use a global list
    # to record the order

    # the sound_list is used to store the sound notes mp3 files
    sound_list = []

    # baes on the number of notes to randomlly open the sound files stored in the sound_notes folder
    for i in range(notes):
        # randrange(n) generates a number in the range [0, n - 1), randomly choose a file number
        # since the file name start from 01, we need to + 1 at the end, then convert to string type
        file_num = str(randrange(24) + 1)

        # get the backend folder path
        path = str(pathlib.Path(__file__).parent.parent.parent.resolve())

        # open the sound file
        sound = AudioSegment.from_mp3(path + f"/sound_notes/key{file_num}.mp3")

        # store the sound in the list
        sound_list.append(sound)

    # create an empty AudioSegment used for merging all sound notes
    merged_sound = AudioSegment.empty()

    # iterate the sound_list and merge all sound notes with durations
    for sound in sound_list:
        # durations * 1000 = duration secs
        merged_sound += sound[:durations * 1000]

    # now we have a tone with "notes" of notes and each with "durations" secs!
    # we can un-comment below line to test it or debug
    # play(merged_sound)

    # convert the Audiosegment file to mp3
    mp3_file = merged_sound.export(format="mp3")

    # return mp3 file to the client
    return FileResponse(mp3_file, content_type="audio/mp3")


@api_view(["GET"])
def getOrders(request):
    # TODO: color corresponds to sound notes needs to be decided, then use a global list
    # to record the order
    pass

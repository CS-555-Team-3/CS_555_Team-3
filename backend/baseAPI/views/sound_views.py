from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from random import randrange
import random
from datetime import date
from pydub import AudioSegment
from django.http import FileResponse

import pathlib
# view acts as a controller in Django, we process program logic here
# temp
dailyChallenge = True
# global order list to record the order of notes
order = []
p_keys = ['A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'A_flat',
          'B_flat',
          'D_flat',
          'E_flat',
          'G_flat'
          ]
familiar_tune_map = [
    [ #1 - beginner
        ['A', 'E', 'F', 'D'], ['A', 'B_flat', 'E', 'A'], ['C',  'G', 'A_flat', 'F'], 
         ['F', 'C', 'A_flat',  'G'], ['A_flat', 'C',  'G', 'F']
    ],
    [ #2 - Advanced
        ['E_flat',  'G', 'D', 'A_flat', 'C'], [ 'G', 'D', 'F', 'C', 'D_flat'], ['C', 'D', 'E_flat',  'G', 'D'],
        ['A_flat', 'D', 'E_flat', 'B_flat', 'C'],['A_flat', 'D', 'E_flat', 'B_flat', 'C']
    ]
    ,
    [ #3 - Expert
        ['A', 'A_flat', 'D', 'C', 'E', 'B_flat'], [  'G', 'F', 'C', 'A_flat', 'D', 'B'],[ 'G', 'C', 'F', 'C', 'A_flat', 'D'],
        [ 'G', 'C', 'F', 'C', 'A_flat', 'D'],['G', 'F', 'F', 'E_flat', 'B_flat',  'G']
    ]
]



@api_view(["GET"])
def getSounds(request, notes, durations, instrument, familiar, dailyChallenge):
    # this endpoint receives two query params: notes and durations
    
        
    # (0) allow for initial duration to be one single input or a list of inputs if your trying to get fancy
    if(type(durations) is not list):
        durations = [durations for i in range(notes)]

    # the sound_list is used to store the sound notes mp3 files
    sound_list = []

    # declare global order variable, and p_keys
    global order
    global p_keys

    # clear the order from the previous sounds
    order = []

    # check params
    if notes <= 0 or notes > 12:
        return Response(status=status.HTTP_400_BAD_REQUEST)

     # check that the duration of a note isnt shorter than 1 beccause this creates choppy sound
    if min(durations) < 1 or max(durations) > 6.0:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if instrument not in ["banjo", "basson", "cello", "flute", "guitar", "mandolin", "oboe", "piano", "viola"]:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # ----------------------------------------   
    # -------- Familair tunes logic ----------
    # ----------------------------------------
        # 1.0: added check for familair tunes : shlomo
    if familiar != 0 and familiar != 1:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
        # 2.0: added change to randomly select the familar-tume bases on difficulty selection
    if familiar == 1:
        # diff == which index to choose from(0:begginer),(1:advanced),(2:expert)
        diff = notes - 4   
        rand_num = randrange(0, 4)
        order = familiar_tune_map[diff][rand_num]

    # ----------------------------------------   
    # -------- Daily Challenge logic ---------
    # ----------------------------------------
        #Setting the initial seed to today's date
    seed = str(date.today()) + str(notes)
        #If Daily Challenge is enabled we make the seed today's date, else we set it to a random value.
    if dailyChallenge:
        random.seed(seed)
    else:
        random.seed(None)

    # baes on the number of notes to randomlly open the sound files stored in the sound_notes folder
    for i in range(notes):
        if familiar == 0:
        # randrange(n) generates a number in the range [0, n - 1), randomly choose a file number
        # since the file name start from 01, we need to + 1 at the end, then convert to string type
            rand_num = randrange(0, 12)

        # record the num in order
        # -> change made to send back list of notes played --> works on my end
        
        # ---> chage #2 : added the ability for the familiar tunes to be played
            order.append(p_keys[rand_num])

        # get the backend folder path
        path = str(pathlib.Path(__file__).parent.parent.parent.resolve())

        # open the sound file
        # sound = AudioSegment.from_mp3(path + f"/sound_notes/key{file_num}.mp3")
        print(order[i])
        sound = AudioSegment.from_file(
            path + f"/sound_notes/{instrument}/{order[i]}.wav", format="wav")

        # store the sound in the list
        sound_list.append(sound)

    # create an empty AudioSegment used for merging all sound notes
    merged_sound = AudioSegment.empty()

    # iterate the sound_list and merge all sound notes with durations
    for i in range(len(sound_list)):
        # some free sound samples are not long enough to last for 2 secs, so it needs to
        # inject silence duration
        if durations[0] == 2.0:
            target_wav_time = 2000
            silence_duration = target_wav_time - len(sound_list[i])
            silenced_segment = AudioSegment.silent(duration=silence_duration)
            merged_sound += (sound_list[i][:durations[i]
                                           * 1000] + silenced_segment)
        elif durations[0] == 1.5:
            target_wav_time = 1500
            silence_duration = target_wav_time - len(sound_list[i])
            silenced_segment = AudioSegment.silent(duration=silence_duration)
            merged_sound += (sound_list[i][:durations[i]
                                           * 1000] + silenced_segment)
        else:
            merged_sound += sound_list[i][:durations[i] * 1000]

    # convert the Audiosegment file to mp3
    mp3_file = merged_sound.export(format="wav")

    # return mp3 file to the client
    return FileResponse(mp3_file, content_type="audio/wav")


@api_view(["GET"])
def getOrders(request):
    # declare global order variable
    global order

    # if order is empty, it means we havn't processed music, return Bad Request
    if not order:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(order)

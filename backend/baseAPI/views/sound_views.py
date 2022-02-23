from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from random import randrange
import random
import pathlib
import os
from pydub import AudioSegment
from pydub.playback import play
from django.http import FileResponse

# view acts as a controller in Django, we process program logic here


global p_keys , key_colors
p_keys = [ 'A_low','A_mid','A_high',
            'B_low','B_mid','B_high',
            'C_low','C_mid','C_high',
            'D_low','D_mid','D_high',
            'E_low','E_mid','E_high',
            'F_low','F_mid','F_high',
            'G_low','G_mid','G_high',
            'A_flat_low','A_flat_mid','A_flat_high',
            'B_flat_low','B_flat_mid','B_flat_high',
            'D_flat_low','D_flat_mid','D_flat_high',
            'G_flat_low','G_flat_mid','G_flat_high'
        ]
key_colors = { 'A_low':'#3DABB8','A_mid':'#598F9A','A_high':'#74737B',
'B_low':'#90585D','B_mid':'#AB3C3E','B_high':'#C72020',
'C_low':'#FAFA00','C_mid':'#DEE602','C_high':'#C3D205',
'D_low':'#82FF9E','D_mid':'#29F569','D_high':'#079C36',
'E_low':'#A7BE07','E_mid':'#8CAA0A','E_high':'#70960C',
'F_low':'#B594B6','F_mid':'#935FA7','F_high':'#674176',
'G_low':'#FDE4CF','G_mid':'#FFCFD2','G_high':'#F1C0E8',
'A_flat_low':'#FA00C4','A_flat_mid':'#D102BB','A_flat_high':'#A905B2',
'B_flat_low':'#A3C4F3','B_flat_mid':'#4A8CE8','B_flat_high':'#134790',
'D_flat_low':'#DA7313','D_flat_mid':'#DC8521','D_flat_high':'#DF962E',
'G_flat_low':'#F83D5C','G_flat_mid':'#F75561','G_flat_high':'#F66D67',
}



@api_view(["GET"])
def generate_rand_tune_list(request, num_notes):
    # 1.0 Create a list of random notes, based on input specs 
    return Response(random.sample(p_keys, 5))


@api_view(["GET"])    
def get_list_mp3(request, note_list, duration_list):
    
    # (0) allow for initial duration to be one single input or a list of inputs if your trying to get fancy
    if(type(duration_list) is not list):
        duration_list = [duration_list for i in len(note_list)]    
        
    tune_list = []
    # (1) get the path
    path = str(pathlib.Path(__file__).parent.parent.parent.resolve())    
    for i in range(len(note_list)):
        
        # (2) get each sound file and add to a list
        sound = AudioSegment.from_mp3(path + f"/piano_keys/{note_list[i]}.mp3")
        tune_list.append(sound)
        
    tune = AudioSegment.empty()
    # (3) merge the sounds together
    for i in range(len(tune_list)):
        # durations * 1000 = duration secs
        tune += tune_list[:duration_list[i] * 1000]
    
    # (4) generate the tune file and send back to the requester    
    tune_file = tune.export(format="mp3")
    return FileResponse(tune_file, content_type="audio/mp3")



@api_view(["GET"])   
def get_color_scheme(request, note_list):
    color_list = [key_colors[note] for note in note_list]
    return Response(color_list) 


@api_view(["GET"])   
def get_one_sound(request, note, duration):
    # (1) initalize the duration currently and the path back
    path = str(pathlib.Path(__file__).parent.parent.parent.resolve())    
        
    # (2) get the one sound file and add to a list
    sound = AudioSegment.from_mp3(path + f"/piano_keys/{note}.mp3")
    s = [sound]
    tune = AudioSegment.empty()
    tune = s[:duration * 1000]

    # (3) generate the tune file and send back to the requester    
    tune_file = tune.export(format="mp3")
    return FileResponse(tune_file, content_type="audio/mp3")


@api_view(["GET"])   
def get_one_color(request, note):
    color = key_colors[note] 
    return Response(color)
    
    
    


@api_view(["GET"])
def getSounds(request, notes, durations):
    # this endpoint receives two query params: notes and durations
    # TODO: color corresponds to sound notes needs to be decided, then use a global list
    # to record the order

    # the sound_list is used to store the sound notes mp3 files
    sound_list = []

    # check params
    if notes <= 0 or notes > 24 or durations <= 0 or durations >= 6.0:
        return Response(status=status.HTTP_400_BAD_REQUEST)

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

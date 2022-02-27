# Backend Framework: Django
### 1. Setup Process - Please follow the steps to active the server:


1. We use Python3 and pip3 for this project, check whether you've installed Python3 and pip3:
      ```
      python3 --version
      ```
      ```
      pip3 --version
      ```
      If the terminal shows "command not found", please install python3 and pip3.


2. It's a good habbit to develop python in virtual enviroment. Install virtual environment:
      ```
      pip3 install virtualenv
      ```
      Then we create a virtual environment:
      ```
      virtualenv myenv (for mac)
      python -m virtualenv myenv (for windows)
      ```
      Now we can go into the virtual environment:
      ```
      source myenv/bin/activate (for Mac)
      .\myenv\Scripts\activate  (for Windows)
      ```
      If we enter the virtual environment successfully, it shows (env) in the terminal

      (Just type "deactivate" to leave virtual environment when you wanna end the development)

3. Now we need to install the package. All packages are listed in "requirements.txt" file in the backend folder.
      ```
      cd backend
      ```
      ```
      pip3 install -r requirements.txt
      ```

      
4. Now we can start the server
      ```
      python3 manage.py runserver
      ```

      Then open the browser and navigate to "http://127.0.0.1:8000/". I believe you can see the rocket.

<br />

### 2. Please develop backend in virtual environment and install package with pip3     

<br />

### 3. We use "Django Rest Framework" to develop the APIs, which has been installed in the app and listed in requirements file.
 

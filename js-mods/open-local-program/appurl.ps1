# define the input arg to be a URI
param (
    [ValidateScript({($_ -as [System.URI]).AbsoluteURI -ne $null})]
    [System.Uri]$arg
   )

# extract the program name from the url
$name = $arg.Host

# define paths to allowed programs
# ************* START EDIT THESE VALUES*************
$programs = @{ "calculator" = "C:\Users\VM\Desktop\Calculator - Shortcut.lnk";
               "hangman" = "C:\Users\VM\Desktop\hangman.exe";
               "weather" = "C:\Users\VM\Desktop\Weather - Shortcut.lnk";
}
# *************END EDIT THESE VALUES*************

# get the potential program's path 
$path = $programs[$name]

# see if input it is an allowed program and has a path, and if so, run the program
if (-not ([string]::IsNullOrEmpty($path))) {
    Start-Process -FilePath $path
}
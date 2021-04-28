### URI Scheme and Handler Application

The first thing you need to set up a custom URI Scheme and register a handler application for it.

A URI Scheme is something that starts a URL/hyperlink that lets Vivaldi hand off an action to another application.

A common URI Scheme is `mailto:` which is accompanied with an email address to allow you to send an email to the address attached from your email client without needing to copy and paste the address over to the other program.

--

The first step to getting a custom URI Scheme working for us is to set up the handler application (the email client program in the `mailto:` example).

**Steps For Windows**

1. Create a new text file and converted to a PowerShell Script by changing `.txt` to `.ps1`.
   **\*Edit:** Old version used `Batch Script`, but lack of a proper way to sanitize input led to using `PowerShell Script` instead.\*
2. Open it by right clicking it and selecting `Edit` and then paste this in to the top white input area:

   ```
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
   ```

   a. You will need to edit the section marked between the start and end `# *************EDIT THESE VALUES*************`. This is where you define which programs are able to run. For each program, you will need to include the name you will call later and the path to the program. **Note:** Spaces are not allowed in the name.

   > **For Example:**
   > For a calculator program, I will later use `example://calculator` as a URL to call the program and I have a shortcut to the program with a path of `C:\Users\VM\Desktop\Calculator - Shortcut.lnk`, so between the curly braces `{` and `}` I will include this line `"calculator" = "C:\Users\VM\Desktop\Calculator - Shortcut.lnk";` > &nbsp; > **Here is the generalized structure:** `"`**`programNameNoSpaces`**`" = "`**`path\to\the\program\executable\or\shortcut`**`";`
   > &nbsp;
   > You can add as many programs as you want, just make sure each set is separated by a `;` or is on a separate line. In the example I gave, I used both separate lines and `;`'s, but it isn't necessary to use both.

3. Save the file and place it in a folder out of the way where it won't get accidentally deleted.
4. For the next steps, we will need the path to the `.ps1` file, so make a note of it for later. In this example, I will use `C:\appurl.ps1` (I just chucked the file in C:\ for testing).

--

The next step in this process is registering the application handling the custom URI Scheme with Windows. This is done by adding keys to the registry with RegEdit.

I followed this guide provided by Microsoft: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa767914(v=vs.85)

This can be saved as a `.reg` file and launched to make the changes to the registry you need, but you will need to replace the path to match the value you saved from step 4 in the last section. You will also need to chose a URI Scheme name. I will be using `example://`:

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\example]
@="URL:Vivaldi Program Launch example Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\example\DefaultIcon]
@="appurl.ps1,1"

[HKEY_CLASSES_ROOT\example\shell]

[HKEY_CLASSES_ROOT\example\shell\open]

[HKEY_CLASSES_ROOT\example\shell\open\command]
@="\"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\" -ExecutionPolicy Bypass -File \"C:\\appurl.ps1\" \"%1\""
```

Every place you see `example` above, including the paths to the registry keys, you should replace with the name of the URI Scheme you chose.

You also need to replace the path in the last registry key with the path to your `.ps1` file. Put a `\` in front of slashes and spaces to escape them. **Only change the part after `-File` between the `\"` and the `\"` what is currently `C:\\appurl.ps1`.**

--

That is all the background work done, so now you can move on to working in Vivaldi.

---

### Setting Up the Speed Dial / Bookmark in Vivaldi

First I would like to thank @LonM and @Pathduck for their posts in [this thread](https://forum.vivaldi.net/topic/46826/starting-multiple-searches-in-different-pages-by-a-single-search-command/). It helped me get past some of the odd quirks I found along the way.

Unfortunately we can't just create a bookmark for `example://programName` and have it work. There are a few oddities that make that method unusable with Vivaldi.

So here is the workaround method to get it to work:

1. Get the name of the program you set up in the `.ps1` file earlier that you want to launch (the first value in something like `"calculator" = "C:\Users\VM\Desktop\Calculator - Shortcut.lnk";`. In this example, I am going to launch a simple command line hangman program I made that has the name `hangman`

2. Next you will need to edit the name of the program into this:

   ```
   data:text/html,<html><body><script>window.location.href="example://hangman";window.history.back();</script></body></html>
   ```

   a. You will need to change the URI Scheme to the one you created earlier. Mine was `example`, so after the `window.location.href`, I put `example://`

   b. After the URI Scheme, you put the name of the program to launch.

   c. You can remove the `window.history.back();` if you want. When you launch the program, it will bring up a blank page. All that that segment does is navigate back a page to have the Start Page visible again.

3. Then you need to create a new bookmark, on the start page or elsewhere, and set the URL to what you got above.

   ![url.png](/assets/uploads/files/1610086124266-url.png)

4. Then, theoretically, you should be all set! When you launch the bookmark, you will need to select `Open` from the popup dialog. ~~Apparently you used to be able to approve the application to run in the future, but a change to Chromium removed this option.~~ (_This is probably a good security feature in this case. I just got a bit annoyed with it in testing..._)

---

> GIF showing it working
>
> > ![Is hishon even a word](https://i.imgur.com/jOI69Fr.gif) > > &nbsp;
> > Too bad I am horrible at spelling and made the program pull a pseudo random word from an API. Dictionary.com doesn't have an entry for `hishon`, so at least I didn't get "hung up" on a real word...

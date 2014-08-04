fluidSlider
===========

A simple slider based in fluid boxes and percentage widths.


Getting Started
----------------

To use the fluidSlider plugin you just need o follow these simple steps:

1. Add the plugin to the document.

    ```
    <head>
      ...
      <script type="text/javascript" src="jquery.fluidSlider.js"></script>
      ...
    </head>
    ```

2. Create the slider layout. Ensure to add the class `fluidSlider` or the data attribute `data-toggle="fluidSlider"` for better styling.

    ```
    <div id="mySlider" data-toggle="fluidSlider">
      <ul>
          <li>element 1</li>
          <li>element 2</li>
          ...
          <li>element n</li>
      </ul>
    </div>
    ```

3. Call the fluidSlider plugin.
    ```
    $('#mySlider').fluidSlider();
    ```

That's it!.

Options
----------------
You can customize the plugin behviour by passing an options plain object when call the plugin by first time. The defauls are:
```
{
  delay: 8000,      // (int) wait time between slides in milliseconds
  autoPlay: false,  // (boolean) start the slider on init
  nav: '',          // jQuery Object, Selector or HTML representing the slider nav
  initial: 0        // initial slide
}
```

All these options can also be setted using HTML5 data API, i.e: `<div id="mySlider" data-autoPlay=true>`.

The delay option defined as before have a global scope, which means that it affects all the slides in the list. However, it's possible to override the delay time locally, setting individual values for each item.
Note that local settings have more predence than globals. i.e:
```
<div id="mySlider" data-delay="8000">           // delay of 3sec (global)
  <ul>
      <li data-delay="3000">element 1</li>      // delay of 3sec (local)
      <li data-delay="6000">element 1</li>      // delay of 6sec (local)
      ...
      <li>element n</li>                        // no local delay defined (use the global value)
  </ul>
</div>
```

Methods
----------------
You can modify the status of the plugin by calling functions as bellow:
    ```
    // Start the slider loop (play)
    $('#mySlider').fluidSlider('start');

    // Stop the slider loop
    $('#mySlider').fluidSlider('stop');

    // Get the play status
    var play = $('#mySlider').fluidSlider('playing');

    // Get the current index
    var index = $('#mySlider').fluidSlider('index');

    // Set the current index to 3 and slide to that item.
    $('#mySlider').fluidSlider('index', 3);

    // Go to the next slide
    $('#mySlider').fluidSlider('next');

    // Go to the prev slide
    $('#mySlider').fluidSlider('prev');

    // Destroy. (Release the memory, unbind events, etc)
    $('#mySlider').fluidSlider('destroy');
    ```

Events
----------------
After the index is modified and the animation is done the event `updated.fluidSlider` is fired over the main element. An object with the current index is passed as an argument of the event.


Sugestions & Issues
-------------------
Any sugestions, pull-requests or bug reports are welcome.

### Enjoy!

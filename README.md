# dynamic-UI-interactions

Create a drop down menu, mobile menu, and image slider.

Video that helps with css animations and transitions: https://www.youtube.com/watch?v=8kK-cA99SA0

-   Drop down menu: Basically navbar with a button and when you click it it slides down nicely and shows you all of the options

1. You can allow the menu to show up either on click or on hover.
2. You should hard-code the menu items into your HTML but hide/reveal them using JavaScript. You can do this either by adding a class (visible or something) or by manually setting the style in JS.
3. Make sure the code is reusable! You should be able to create multiple drop-downs on a page without repeating the JavaScript code; could be able to reuse it when you do the mobile menu depending on the menu you were inspired by

-   Mobile Menu:

1. Basically has to work on mobile, so there's a little bit of responsiveness in there, but yeah mainly go to one of these links and try to implement one of its stuff; i'd recommend the ones about tabs, where you'd click on a tab and it highlights that you're on said tab. Also that idea that you can only have 5 tabs and like the 5th one or something is like the "more" tab where you press on it and it reveals more links; this would be like horizontal tabs rather than a vertical stack, but yeah who knows

-   https://marvelapp.com/blog/hamburger-menu-alternatives-mobile-navigation/
-   https://dribbble.com/search/mobile-menu

*   Image Slider

1. Simple image carousel that moves forward and backward with some arrows. It should move every five seconds . Should contain little nav circles at the bottom that indicate which image you're on, like on instagram. So the one that you're on is filled in whilst all others are not filled in
2. Obviously images have to display at a correct size.
3. Here are some tips since this is a little more involved and difficult:

-   Make a "div" or container that contains all individual "slides"
-   Makes functions for going to the "next" and "previous" images, make sure the transition is smooth using simple effects
-   For the dots at the bottom of the slides, each dot represents a slide, go when a slide is activated the corresponding dot/circle is filled in. Of course make it correspond to each other, in order to get the functionality that if you click on a specific dot/circle it takes you to that specific slide/image
-   Add a timeout which advances the slides every 5 seconds

*   Notes from the articles:

-   What are some different types of navigation menus?

-   What are the laternatives to the hamburger menus?

-   What are the downsides of hamburger menus?

Setup: Essentially I'm going to try to make it all in one app. Just a header that's expanded, but then make it responsive so it shows a new menu on mobile that acts differently. Then in the main-content we're going to have the image carousel.

/*
Here's what the carousel should look like in html, well the testing version, so when you're done
with the main stuff with the data active and responsive, do innerHTML, so that we can at least 
see what's happening

<section id="project-main-content">
	<!-- Create the image carousel itself -->
	<div class="image-carousel">
		<!-- Create a slide -->
		<div class="slide" style="left: 0; top: 0">
			<img
				class="carousel-image"
				src="./assets/images/image_1.jpg"
				alt="Image 1"
			/>
		</div>

		<div class="slide" style="left: 100%; top: 0">
			<img
				class="carousel-image"
				src="./assets/images/image_2.jpg"
				alt="Image 2"
			/>
		</div>

		<!-- Have a div that contains the small dot buttons at the bottom -->
	</div>

	<!-- Container for the buttons for operating the carousel -->
	<div class="carousel-btns-container">
		<div class="main-carousel-btns-container">
			<button id="prev-image-btn">
				<img
					src="./assets/icons/arrow_back.svg"
					alt="left arrow"
				/>
			</button>
			<button id="next-image-btn">
				<img
					src="./assets/icons/arrow_forward.svg"
					alt="left arrow"
				/>
			</button>
		</div>

		<div class="secondary-carousel-btns-container">
			<div class="slide-dot" data-active="true"></div>
			<div class="slide-dot"></div>
			<div class="slide-dot"></div>
		</div>
	</div>
</section>
*/

const imageSources = [
    "./assets/images/image_1.jpg",
    "./assets/images/image_2.jpg",
    "./assets/images/image_3.webp",
    "./assets/images/image_4.jpg",
    "./assets/images/image_5.jpg",
];

// Creates image carousel with the images on the inside
function createImageCarousel() {
    // Create container that contents all components of image carousel
    const imageCarousel = document.createElement("div");
    imageCarousel.id = "image-carousel-content";

    // Create an outer container that will hide the slides, which works with the inner container
    const slidesOuterContainer = document.createElement("div");
    slidesOuterContainer.classList.add("slides-outer-container");
    imageCarousel.appendChild(slidesOuterContainer);

    // Creates the inner container that's responsible for only moving the slides, rather than hiding them.
    const slidesInnerContainer = document.createElement("div");
    slidesInnerContainer.classList.add("slides-inner-container");
    slidesOuterContainer.appendChild(slidesInnerContainer);

    // Create the container for the main and secondary buttons
    const carouselBtnsContainer = document.createElement("div");
    carouselBtnsContainer.classList.add("carousel-btns-container");
    imageCarousel.appendChild(carouselBtnsContainer);

    // Container for main buttons of the carousel; then create the previous and next image buttons for navigating the carousel
    const mainCarouselBtnsContainer = document.createElement("div");
    mainCarouselBtnsContainer.classList.add("main-carousel-btns-container");
    carouselBtnsContainer.appendChild(mainCarouselBtnsContainer);

    const prevImageBtn = document.createElement("button");
    prevImageBtn.id = "prev-image-btn";
    prevImageBtn.textContent = "Prev";
    mainCarouselBtnsContainer.appendChild(prevImageBtn);

    const nextImageBtn = document.createElement("button");
    nextImageBtn.id = "next-image-btn";
    nextImageBtn.innerHTML = "Next";
    mainCarouselBtnsContainer.appendChild(nextImageBtn);

    // Create container for the secondary buttons, which will depend on the amount of images that are going to be displayed
    const secondaryCarouselBtnsContainer = document.createElement("div");
    secondaryCarouselBtnsContainer.classList.add(
        "secondary-carousel-btns-container"
    );
    carouselBtnsContainer.appendChild(secondaryCarouselBtnsContainer);

    // Get a list of the images from the folder; iterate through all image sources to create image slides and then slide dots for the carousel
    imageSources.forEach((imageSource, index) => {
        // Create a slide and style it; then nest the slide on the imageCarousel element
        const slide = document.createElement("div");
        slide.style.left = `${index * 100}%`;
        slide.style.top = 0;
        slide.classList.add("slide");
        slidesInnerContainer.appendChild(slide);

        // Create image and nest it inside the slide
        const imageEl = document.createElement("img");
        imageEl.src = imageSource;
        imageEl.classList.add("carousel-image");
        slide.appendChild(imageEl);

        // Create the slide dot and put it inside the colntainer for the secondary carousel buttons
        const slideDot = document.createElement("div");
        slideDot.setAttribute("data-slide-index", index);
        slideDot.classList.add("slide-dot");
        // If it's the first image, then set data-active on it because that's going to be the default image that first displays
        if (index == 0) {
            slideDot.setAttribute("data-active", "true");
        }
        secondaryCarouselBtnsContainer.appendChild(slideDot);
    });

    // Return the container
    return imageCarousel;
}

export { createImageCarousel };

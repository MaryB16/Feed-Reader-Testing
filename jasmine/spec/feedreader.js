/*global allFeeds:true, loadFeed*/

// Runs all the tests when the page is loaded
$(function () {

    // Test suite for the RSS Feeds 
    describe('RSS Feeds', function () {

        // Checks that the allFeeds variable has been defined and it is not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through all the feeds and makes sure that each one has an url and is not empty
        it('have a non empty URL', function () {
            allFeeds.forEach(function (element) {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        });

        /* Loops through all the feeds and makes sure that each has a name defined and that the name is not empty */
        it('have a defined name', function () {
            allFeeds.forEach(function (element) {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });

    // Test suite for the menu
    describe('The menu', function () {
        const body = $('body')[0];

        // Ensures that the menu is hidden when the page loads
        it('is hidden by default', function () {
            expect(body).toHaveClass('menu-hidden');
        });

        // Ensures that the menu changes visibility when the menu icon is clicked
        it('changes visibility on click', function () {
            const menuIcon = document.querySelector('.menu-icon-link');

            // Simulate first click, the menu should be displayed
            menuIcon.click();
            expect(body).not.toHaveClass('menu-hidden');

            // Simulate second click, the menu should be hidden
            menuIcon.click();
            expect(body).toHaveClass('menu-hidden');
        });
    });

    // Test suite for initial Entries   
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Ensures that after loadFeed is done, there is at least one element within the feed container
        it('are loaded', function () {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    // Test suite for New Feed Selection
    describe('New Feed Selection', function () {
        let firstFeed;
        let secondFeed;

        /* Loads the first feed and saves the HTML content in variable then does the same for the second feed */
        beforeEach(function (done) {
            const feedContainer = $('.feed');
            loadFeed(0, function () {
                firstFeed = feedContainer.html();
                loadFeed(1, function () {
                    secondFeed = feedContainer.html();
                    done();
                });
            });
        });

        // Ensures that after a new feed is selected, the page content is different
        it('changes the content when a new feed is loaded', function () {
            expect(firstFeed).not.toBe(secondFeed);
        });

        // Ensures that when loadFeed is called with invalid arguments it throws an error
        it('does not work for out-of-bound feed ids', function () {
            const lowerBound = -1;
            const upperBound = allFeeds.length;
            expect(function () {
                loadFeed(lowerBound);
            }).toThrowError(TypeError);

            expect(function () {
                loadFeed(upperBound);
            }).toThrowError(TypeError);
        });
    });

}());

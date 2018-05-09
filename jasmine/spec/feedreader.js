/*global allFeeds:true, loadFeed*/

$(function () {
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a non empty URL', function () {
            allFeeds.forEach(function (element) {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        });

        it('have a defined name', function () {
            allFeeds.forEach(function (element) {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function () {
        const body = $("body")[0];

        it('is hidden by default', function () {
            expect(body).toHaveClass('menu-hidden');
        });

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

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            // Clear the feed before each test
            $('.feed').empty();
            loadFeed(0, done);
        });

        it('are loaded', function (done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        let firstFeed;
        let secondFeed;

        beforeEach(function (done) {
            const feedContainer = $('.feed');
            feedContainer.empty();
            loadFeed(0, function () {
                firstFeed = feedContainer.html();
                loadFeed(1, function () {
                    secondFeed = feedContainer.html();
                    done();
                });
            });
        });

        it("changes the content when a new feed is loaded", function () {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });

}());

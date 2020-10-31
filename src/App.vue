<template>
    <div id="app" class="flex container h-screen w-full">
        <!--font-awesome-links-->
        <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
        <!--side nav-->
        <div class="lg:w-1/5 border-r border-lighter lpx-2 lg:px-6 py-2 flex flex-col justify-between">
            <div class="">
                <button class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue focus:outline-none">
                    <i class="fab fa-twitter"/>
                </button>
                <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, saepe?<font-awesome-icon icon="paper-plane"/></p>-->
                <div>
                    <button v-for="tab in tabs" v-bind:key="tab" @click="id = tab.id"
                            :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-blue' : ''}`">
                        <i :class="`${tab.icon} text-2xl mr-4 text-left`">
                        </i>
                        <p class="text-lg font-semibold text-left hidden lg:block"> {{ tab.title }} </p>
                    </button>
                </div>
                <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
                    <p class="hidden lg:block"> Tweet</p>
                    <!--<i class="fas fa-plus lg:hidden"/>-->
                </button>
            </div>
            <div class="lg:w-full relative">
                <button @click="dropdown = true" class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
                    <img src="./assets/img/barry.jpg" class="w-10 h-10 rounded-full border border-lighter" alt="">
                    <div class="hidden lg:block ml-4">
                        <p class="text-sm font-bold leading-tight"> Barry Allen</p>
                        <p class="text-sm leading-tight"> @BarryAllen</p>
                    </div>
                    <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"/>
                </button>
                <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
                    <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none">
                        <img src="./assets/img/barry.jpg" class="w-10 h-10 rounded-full border border-lighter" alt="">
                        <div class="ml-4">
                            <p class="text-sm font-bold leading-tight"> Barry Allen</p>
                            <p class="text-sm leading-tight"> @BarryAllen</p>
                        </div>
                        <i class="fas fa-check ml-auto text-blue"/>
                    </button>
                    <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm focus:outline-none">
                        Add an existing account
                    </button>
                    <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm focus:outline-none">
                        Log out @BarryAllen
                    </button>
                </div>
            </div>
        </div>
        <!--tweets-->
        <div class="w-1/2 h-full overflow-y-scroll">
            <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
                <h1 class="text-lg font-bold">Home</h1>
                <i class="fas fa-star text-lg text-blue"/>
            </div>
            <div class="px-5 py-3 border-b-8 border-lighter flex">
                <div>
                    <img src="./assets/img/barry.jpg" class="w-12 h-12 rounded-full border border-lighter" alt=""/>
                </div>
                <form v-on:submit.prevent = "addNewTweet" class="w-full px-4 relative">
                    <textarea v-model="tweet.content" class="my-3 w-full focus:outline-none" placeholder="What's up?" name="" id=""/>
                    <div class="flex items-center">
                        <i class="text-lg text-blue mr-4 far fa-image"/>
                        <i class="text-lg text-blue mr-4 fas fa-film"/>
                        <i class="text-lg text-blue mr-4 far fa-chart-bar"/>
                        <i class="text-lg text-blue mr-4 far fa-smile"/>
                    </div>
                    <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
                        Tweet
                    </button>
                </form>
            </div>
            <div class="flex flex-col-reverse">
                <div class="w-full p-4 border-b hover:bg-lighter flex">
                    <div class="flex-none mr-4">
                        <img src="./assets/img/barry.jpg" class="w-12 h-12 rounded-full flex-none" alt=""/>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center w-full">
                            <p class="font-semibold"> Barry Allen</p>
                            <p class="text-sm text-dark ml-2"> @BarryAllen</p>
                            <p class="text-sm text-dark ml-2"> 1 sec</p>
                            <i class="fas fa-angle-down text-dark ml-auto"/>
                        </div>
                        <p class="py-2">
                            {{ tweet.content }}
                        </p>
                        <div class="flex items-center justify-between w-full">
                            <div class="flex items-center text-sm text-dark">
                                <i class="far fa-comment mr-3"/>
                                <p> 0</p>
                            </div>
                            <div class="flex items-center text-sm text-dark">
                                <i class="fas fa-retweet mr-3"/>
                                <p> 0</p>
                            </div>
                            <div class="flex items-center text-sm text-dark">
                                <i class="far fa-heart mr-3"/>
                                <p> 0</p>
                            </div>
                            <div class="flex items-center text-sm text-dark">
                                <i class="fas fa-share-square mr-3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="follow in following" v-bind:key="follow" class="w-full p-4 border-b hover:bg-lighter flex">
                <div class="flex-none mr-4">
                    <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none" alt=""/>
                </div>
                <div class="w-full">
                    <div class="flex items-center w-full">
                        <p class="text-semibold"> {{ follow.name }}</p>
                        <p class="text-sm text-dark ml-2"> {{ follow.handle }}</p>
                        <p class="text-sm text-dark ml-2"> {{ follow.time }}</p>
                        <i class="fas fa-angle-down text-dark ml-auto"/>
                    </div>
                    <p class="py-2">
                        {{ follow.tweet }}
                    </p>
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center text-sm text-dark">
                            <i class="far fa-comment mr-3"/>
                            <p>
                                {{ follow.comments }}
                            </p>
                        </div>
                        <div class="flex items-center text-sm text-dark">
                            <i class="fas fa-retweet mr-3"/>
                            <p>
                                {{ follow.retweets }}
                            </p>
                        </div>
                        <div class="flex items-center text-sm text-dark">
                            <i class="far fa-heart mr-3"/>
                            <p>
                                {{ follow.like }}
                            </p>
                        </div>
                        <div class="flex items-center text-sm text-dark">
                            <i class="fas fa-share-square mr-3"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--trending-->
        <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
            <label>
                <input type="text" class="pl-12 rounded-full w-full p-2 bg-lighter focus:outline-none text-sm mb-4" placeholder="Search Twitter"/>
                <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"/>
                <div class="w-full rounded-lg bg-lightest">
                    <div class="flex items-center justify-between p-3">
                        <p class="text-lg font-bold">Trends for You</p>
                        <i class="fas fa-cog text-lg text-blue"/>
                    </div>
                    <button v-for="trend in trending" v-bind:key="trend" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter focus:outline-none">
                        <div>
                            <p class="text-sm text-left leading-title text-dark"> {{ trend.top }}</p>
                            <p class="font-bold text-left leading-title"> {{ trend.title }}</p>
                            <p class="text-left leading-title text-dark"> {{ trend.bottom }}</p>
                        </div>
                        <i class="fas fa-angle-down text-lg text-dark"/>
                    </button>
                    <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
                        Show More
                    </button>
                </div>
                <div class="w-full rounded-lg bg-lightest p-3 my-4">
                    <div class="p-3">
                        <p class="text-lg font-bold">Who to follow</p>
                    </div>
                    <button v-for="friend in friends" v-bind:key="friend" class="w-full flex hover:bg-lighter p-3 border-t border-lighter focus:outline-none">
                        <img :src="`${ friend.src }`" class="w-12 h-12 rounded-full border border-lighter" alt="">
                        <div class="hidden lg:block ml-4">
                            <p class="text-sm font-bold leading-tight"> {{ friend.name }}</p>
                            <p class="text-sm leading-tight"> {{ friend.handle }}</p>
                        </div>
                        <button class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue focus:outline-none">
                            Follow
                        </button>
                    </button>
                    <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
                        Show More
                    </button>
                </div>
            </label>

        </div>
        <!--<router-view/>-->
    </div>
</template>

<style>
    @import "assets/css/tailwind.css";
</style>
<script>
    console.log("Start");
    export default {
        name: 'app',
        components: {},
        data() {
            return {
                tabs: [
                    {icon: 'fas fa-home', title: 'Home', id: 'home'},
                    {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
                    {icon: 'fas fa-bell', title: 'Notifications', id: 'notifications'},
                    {icon: 'fas fa-envelope', title: 'Messages', id: 'messages'},
                    {icon: 'fas fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
                    {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
                    {icon: 'fas fa-user', title: 'Profile', id: 'profile'},
                    {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'},
                ],
                id: 'home',
                dropdown: false,
                trending: [
                    {top: 'Trending in TX', title: "Gigi", bottom: 'Trending with: Rip Gigi'},
                    {top: 'Music', title: "We won", bottom: '125k Tweets'},
                    {top: 'Pop', title: "Blue Ivy", bottom: '40k Tweets'},
                    {top: 'Trending in US', title: "Denim Day", bottom: '40k Tweets'},
                    {top: 'Trending', title: "When Beyonce", bottom: '25.4k Tweets'},
                ],
                friends: [
                    {src: 'https://media.gq.com/photos/566ac3fec0f741b430e641e7/master/pass/elon-musk-gq-1215-01-sq.jpg', name: 'Elon Musk', handle: '@teslaboy'},
                    {src: 'https://i2-prod.mirror.co.uk/incoming/article22235111.ece/ALTERNATES/s1200c/0_Lucifer-season-5-coming-out.jpg', name: 'Lucifer MorningStar', handle: '@lucifer'},
                    {src: 'https://i.pinimg.com/originals/03/79/3c/03793c5e9685ba630dbd71db2bf98210.jpg', name: 'Chloe Decker', handle: '@detective'},
                ],
                following: [
                    {src: 'https://media.gq.com/photos/566ac3fec0f741b430e641e7/master/pass/elon-musk-gq-1215-01-sq.jpg', name: 'Elon Musk', handle: '@teslaboy', time: '20min', tweet: 'Should I just quarantine on Mars???', comments: '`1,000', retweets: '550', like: '1,000,003'},
                    {src: 'https://i2-prod.mirror.co.uk/incoming/article22235111.ece/ALTERNATES/s1200c/0_Lucifer-season-5-coming-out.jpg', name: 'Lucifer MorningStar', handle: '@lucifer', time: '21min', tweet: 'What do you truly desire?', comments: '`6,666', retweets: '666', like: '6,666,666'},
                    {src: 'https://i2-prod.mirror.co.uk/incoming/article22235111.ece/ALTERNATES/s1200c/0_Lucifer-season-5-coming-out.jpg', name: 'Lucifer MorningStar', handle: '@lucifer', time: '1.4hour', tweet: 'Detective!!!', comments: '`69', retweets: '669', like: '1,767,778'},
                ],
                tweets: [
                    {content: 'It is so nice outside!'}
                ],
                tweet: {content: ''}
            }
        },
        methods: {
            addNewTweet() {
                let newTweet = {
                    content: this.tweet.content
                };
                this.tweets.push (newTweet)
            }
        }
    }
    console.log("End");
</script>

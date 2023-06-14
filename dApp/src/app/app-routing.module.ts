import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { ActivityPageComponent } from './components/pages/activity-page/activity-page.component';
import { AuthorProfilePageComponent } from './components/pages/author-profile-page/author-profile-page.component';
import { AuthorsPageComponent } from './components/pages/authors-page/authors-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { CollectionPageComponent } from './components/pages/collection-page/collection-page.component';
import { ConnectWalletPageComponent } from './components/pages/connect-wallet-page/connect-wallet-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { CreatePageComponent } from './components/pages/events/create-page/create-page.component';
import { EventDetailComponent } from './components/pages/events/event-detail/event-detail.component';
import { FaucetComponent } from './components/pages/events/faucet/faucet.component';
import { ManageEventComponent } from './components/pages/events/manage-event/manage-event.component';
import { ExplorePageFiveComponent } from './components/pages/explore-page-five/explore-page-five.component';
import { ExplorePageFourComponent } from './components/pages/explore-page-four/explore-page-four.component';
import { ExplorePageOneComponent } from './components/pages/explore-page-one/explore-page-one.component';
import { ExplorePageSevenComponent } from './components/pages/explore-page-seven/explore-page-seven.component';
import { ExplorePageSixComponent } from './components/pages/explore-page-six/explore-page-six.component';
import { ExplorePageThreeComponent } from './components/pages/explore-page-three/explore-page-three.component';
import { ExplorePageTwoComponent } from './components/pages/explore-page-two/explore-page-two.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
// import { ItemDetailsPageComponent } from './components/pages/item-details-page/item-details-page.component';
import { LiveAuctionPageComponent } from './components/pages/live-auction-page/live-auction-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { MyTicketsComponent } from './components/pages/events/my-tickets/my-tickets.component';
import { VerifyTicketComponent } from './components/pages/verify-ticket/verify-ticket.component';
import { TicketDetailsComponent } from './components/pages/events/ticket-details/ticket-details.component';

const routes: Routes = [
    { path: '', component: HomeDemoOneComponent },
    { path: 'index-2', component: HomeDemoTwoComponent },
    { path: 'index-3', component: HomeDemoThreeComponent },
    { path: 'explore-1', component: ExplorePageOneComponent },
    { path: 'explore-2', component: ExplorePageTwoComponent },
    { path: 'explore-3', component: ExplorePageThreeComponent },
    { path: 'explore-4', component: ExplorePageFourComponent },
    { path: 'explore-5', component: ExplorePageFiveComponent },
    { path: 'explore-6', component: ExplorePageSixComponent },
    { path: 'explore-7', component: ExplorePageSevenComponent },
    // {path: 'item-details', component: ItemDetailsPageComponent},
    { path: 'collection', component: CollectionPageComponent },
    { path: 'live-auctions', component: LiveAuctionPageComponent },
    { path: 'activity', component: ActivityPageComponent },
    { path: 'authors', component: AuthorsPageComponent },
    { path: 'author-profile', component: AuthorProfilePageComponent },
    { path: 'connect-wallet', component: ConnectWalletPageComponent },
    // {path: 'about', component: AboutPageComponent},
    { path: 'blog', component: BlogPageComponent },
    { path: 'blog-details', component: BlogDetailsPageComponent },

    { path: 'terms-conditions', component: TermsConditionsPageComponent },
    { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
    { path: 'faq', component: FaqPageComponent },
    { path: 'contact', component: ContactPageComponent },

    /** -- Added for TicketBlock -- */
    {
        path: 'faucet',
        component: FaucetComponent,
        data: {
            title: 'Faucet',
        },
    },
    { path: 'create', component: CreatePageComponent },
    { path: 'event/create', component: CreatePageComponent },

    {
        path: 'event/manage/:id',
        component: ManageEventComponent,
        data: {
            title: 'Manage your Event',
        },
    },
    {
        path: 'event/:id',
        component: EventDetailComponent,
        data: {
            title: 'Manage your Event',
        },
    },

    { path: 'event/ticket/:eventId/:id', component: TicketDetailsComponent },

    // Here add new pages component
    { path: 'my-tickets', component: MyTicketsComponent },
    { path: 'verify-ticket', component: VerifyTicketComponent },

    { path: '**', component: NotFoundPageComponent }, // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

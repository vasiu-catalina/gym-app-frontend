import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { MeasurementsComponent } from './pages/measurements/measurements.component';
import { MeasurementformComponent } from './shared/components/measurement-form/measurement-form.component';
import { PhotoAlbumsComponent } from './pages/photo-albums/photo-albums.component';
import { PhotoAlbumViewComponent } from './pages/photo-album-view/photo-album-view.component';
import { GymPlansComponent } from './pages/gym-plans/gym-plans.component';
import { GymPlanViewComponent } from './pages/gym-plan-view/gym-plan-view.component';
import { GymPlanFormComponent } from './shared/components/gym-plan-form/gym-plan-form.component';
import { GymPlanAiFormComponent } from './shared/components/gym-plan-ai-form/gym-plan-ai-form.component';
import { WorkoutLogFormComponent } from './shared/components/workout-log-form/workout-log-form.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkoutLogsComponent } from './pages/workout-logs/workout-logs.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'account', component: AccountComponent
    },
    {
        path: 'measurements', component: MeasurementsComponent
    },
    {
        path: 'measurements/create', component: MeasurementformComponent
    },
    {
        path: 'measurements/update/:id', component: MeasurementformComponent
    },
    {
        path: 'photo-albums', component: PhotoAlbumsComponent
    },
    {
        path: 'photo-albums/:id', component: PhotoAlbumViewComponent
    },
    {
        path: 'gym-plans', component: GymPlansComponent
    },
    {
        path: 'gym-plans/create', component: GymPlanFormComponent
    },
    {
        path: 'gym-plans/generate', component: GymPlanAiFormComponent
    },
    {
        path: 'gym-plans/:id', component: GymPlanViewComponent
    },
    {
        path: 'gym-plans/:id/update', component: GymPlanFormComponent
    },
    {
        path: 'workout-logs/create', component: WorkoutLogFormComponent
    },
    {
        path: 'workout-logs', component: WorkoutLogsComponent
    },
    {
        path: 'workout-logs/:id/update', component: WorkoutLogFormComponent
    },
    {
        path: '', component: HomeComponent,
    },
    {
        path: '**', redirectTo: 'account'
    }
];

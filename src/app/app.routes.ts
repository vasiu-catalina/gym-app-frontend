import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { MeasurementsComponent } from './pages/measurements/measurements.component';
import { MeasurementformComponent } from './shared/components/measurement-form/measurement-form.component';

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
        path: '**', redirectTo: 'account'
    }
];

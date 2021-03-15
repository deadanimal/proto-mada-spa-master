import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { KemasukanDataComponent } from './kemasukan-data/kemasukan-data.component';
import { PengesahanComponent } from './pengesahan/pengesahan.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'user',
                component: ManagementUserComponent
            },
            {
                path: 'kemasukan-data',
                component: KemasukanDataComponent
            },
            {
                path: 'pengesahan',
                component: PengesahanComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'audit-trails',
                component: ManagementAuditComponent
            },

            // {
            //     path: 'management',
            //     children: [
            //         {
            //             path: 'audit-trails',
            //             component: ManagementAuditComponent
            //         },
            //         {
            //             path: 'user',
            //             component: ManagementUserComponent
            //         }
            //     ]
            // },
            // {
            //     path: 'report',
            //     component: ReportComponent
            // }
        ]
    }
]
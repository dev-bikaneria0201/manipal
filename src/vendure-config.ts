import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,LanguageCode,CustomFields 
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import { MultivendorPlugin } from './plugins/multivendor-plugin/multivendor.plugin';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +process.env.PORT || 3000;

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        trustProxy: IS_DEV ? false : 1,
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiDebug: true,
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: 'better-sqlite3',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: true,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: path.join(__dirname, '../vendure.sqlite'),
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {
    Product: [
      {
        name: 'ratePerGram',
        type: 'float',
        label: [{ languageCode: LanguageCode.en, value: 'Rate / Gram (₹)' }],
      },
      {
        name: 'monthlyRol',
        type: 'float',
        label: [{ languageCode: LanguageCode.en, value: 'Monthly ROI (%)' }],
      },
      {
        name: 'tenure',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'Tenure (Months)' }],
      },
      {
        name: 'annualRol',
        type: 'float',
        label: [{ languageCode: LanguageCode.en, value: 'Annual ROI (%)' }],
      },
      {
        name: 'requiredGold',
        type: 'float',
        label: [{ languageCode: LanguageCode.en, value: 'Required Gold (grams)' }],
      },
      {
        name: 'monthlyInterest',
        type: 'float',
        label: [{ languageCode: LanguageCode.en, value: 'Monthly Interest (₹)' }],
      },
    ],
    
     Order: [
      {
        name: 'scheduleVisit',
        type: 'datetime',
        label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visit Date & Time' }],
      },
      {
        name: 'salesPersonName',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'Salesperson Name' }],
      },
      {
        name: 'salesPersonContact',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'Salesperson Contact Number' }],
      },
      {
        name: 'salesPersonEmail',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'Salesperson Email' }],
      },
    ],
    Customer: [
      {
        name: 'userRole',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'User Role' }],
        options: [
          { value: 'loan-applier', label: [{ languageCode: LanguageCode.en, value: 'Loan Applier' }] },
          { value: 'salesperson', label: [{ languageCode: LanguageCode.en, value: 'Salesperson' }] },
          { value: 'admin', label: [{ languageCode: LanguageCode.en, value: 'Admin' }] },
          { value: 'marketing', label: [{ languageCode: LanguageCode.en, value: 'Marketing' }] },
        ],
        
       
      },
      {
        name: 'availableSlots',
        type: 'string',
        list: true,
        label: [{ languageCode: LanguageCode.en, value: 'Available Slots' }],
        nullable: true,
      },
      {
        name: 'scheduledVisits',
        type: 'string',
        list: true,
        label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visits (Customer Details)' }],
        nullable: true,
      },
      {
        name: 'kycStatus',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'Customer KYC Status' }],
        options: [
          { value: 'verified', label: [{ languageCode: LanguageCode.en, value: 'Verified' }] },
          { value: 'not-verified', label: [{ languageCode: LanguageCode.en, value: 'Not Verified' }] },
        ],
        nullable: true,
      },
    ],
  },

    plugins: [
        GraphiqlPlugin.init(),
       


   MultivendorPlugin.init({
       platformFeePercent: 10,
       platformFeeSKU: 'FEE',
   }),
   // ...
 
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets/',
        }),
        DefaultSchedulerPlugin.init(),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: serverPort + 2,
            adminUiConfig: {
                apiPort: serverPort,
            },
        }),
    ],
};

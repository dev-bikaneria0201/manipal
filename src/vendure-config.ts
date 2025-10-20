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
import { Seller } from '@vendure/core/dist/entity/seller/seller.entity';
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
//     customFields: {
//        Vendor: [
//     { name: 'advisorType', type: 'string', nullable: true },
//     { name: 'serviceArea', type: 'string', nullable: true },
//     { name: 'rating', type: 'float', nullable: true },
//   ],
//     Product: [
//       {
//         name: 'ratePerGram',
//         type: 'float',
//         label: [{ languageCode: LanguageCode.en, value: 'Rate / Gram (₹)' }],
//       },
//       {
//         name: 'monthlyRol',
//         type: 'float',
//         label: [{ languageCode: LanguageCode.en, value: 'Monthly ROI (%)' }],
//       },
//       {
//         name: 'tenure',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Tenure (Months)' }],
//       },
//       {
//         name: 'annualRol',
//         type: 'float',
//         label: [{ languageCode: LanguageCode.en, value: 'Annual ROI (%)' }],
//       },
//       {
//         name: 'requiredGold',
//         type: 'float',
//         label: [{ languageCode: LanguageCode.en, value: 'Required Gold (grams)' }],
//       },
//       {
//         name: 'monthlyInterest',
//         type: 'float',
//         label: [{ languageCode: LanguageCode.en, value: 'Monthly Interest (₹)' }],
//       },
//     ],
    
//      Order: [
//       {
//         name: 'scheduleVisit',
//         type: 'datetime',
//         label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visit Date & Time' }],
//       },
//       {
//         name: 'salesPersonName',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Salesperson Name' }],
//       },
//       {
//         name: 'salesPersonContact',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Salesperson Contact Number' }],
//       },
//       {
//         name: 'salesPersonEmail',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Salesperson Email' }],
//       },
//       { name: 'advisorVendorId', type: 'relation', entity: Vendor, nullable: true },
//     { name: 'visitStatus', type: 'string', nullable: true }, // pending, scheduled, completed, cancelled
//     { name: 'scheduledVisitDate', type: 'datetime', nullable: true },
//     { name: 'advisorNotes', type: 'string', nullable: true },
//     { name: 'loanType', type: 'string', nullable: true },
//     ],
//     Customer: [
//       {
//         name: 'userRole',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'User Role' }],
//         options: [
//           { value: 'loan-applier', label: [{ languageCode: LanguageCode.en, value: 'Loan Applier' }] },
//           { value: 'salesperson', label: [{ languageCode: LanguageCode.en, value: 'Salesperson' }] },
//           { value: 'admin', label: [{ languageCode: LanguageCode.en, value: 'Admin' }] },
//           { value: 'marketing', label: [{ languageCode: LanguageCode.en, value: 'Marketing' }] },
//         ],
        
       
//       },
//       {
//         name: 'availableSlots',
//         type: 'string',
//         list: true,
//         label: [{ languageCode: LanguageCode.en, value: 'Available Slots' }],
//         nullable: true,
//       },
//       { name: 'scheduledVisits', type: 'string', list: true, nullable: true }, // store ISO date strings
//     { name: 'advisorVendorId', type: 'relation', entity: 'Vendor', nullable: true },
//       {
//         name: 'kycStatus',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Customer KYC Status' }],
//         options: [
//           { value: 'verified', label: [{ languageCode: LanguageCode.en, value: 'Verified' }] },
//           { value: 'not-verified', label: [{ languageCode: LanguageCode.en, value: 'Not Verified' }] },
//         ],
//         nullable: true,
//       },
//       {
//         name: 'PanNumber',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'PAN NUMBER' }],
//         nullable: true,
//       },
//       {
//       name: 'Occupation',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Occupation' }],
//       options: [
//             { value: 'farmer', label: [{ languageCode: LanguageCode.en, value: 'Farmer' }] },
//             { value: 'salaried', label: [{ languageCode: LanguageCode.en, value: 'Salaried' }] },
//             { value: 'self-employed-business', label: [{ languageCode: LanguageCode.en, value: 'Self Employed (Business)' }] },
//             { value: 'self-employed-professional', label: [{ languageCode: LanguageCode.en, value: 'Self Employed (Professional)' }] },
//         ],
//       nullable: true,
// },
// {
//         name: 'AlternateNumber',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Alternate Number' }],
//         nullable: true,
//       },
//       {
//         name: 'CibilScore',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Cibil Score' }],
//         nullable: true,
//       },
//       {
//         name: 'OrderId',
//         type: 'string',
//         label: [{ languageCode: LanguageCode.en, value: 'Order ID' }],
//         nullable: true,
//       }

//     ],
//   },
// customFields: {
//   /**
//    * ===========================
//    * CUSTOMER CUSTOM FIELDS
//    * ===========================
//    */
//   Customer: [
//     {
//       name: 'userRole',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'User Role' }],
//       options: [
//         { value: 'loan-applier', label: [{ languageCode: LanguageCode.en, value: 'Loan Applier' }] },
//         { value: 'salesperson', label: [{ languageCode: LanguageCode.en, value: 'Salesperson' }] },
//         { value: 'admin', label: [{ languageCode: LanguageCode.en, value: 'Admin' }] },
//         { value: 'marketing', label: [{ languageCode: LanguageCode.en, value: 'Marketing' }] },
//       ],
//     },
//     {
//       name: 'availableSlots',
//       type: 'string',
//       list: true,
//       label: [{ languageCode: LanguageCode.en, value: 'Available Slots' }],
//       nullable: true,
//     },
//     {
//       name: 'scheduledVisits',
//       type: 'string',
//       list: true,
//       label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visits' }],
//       nullable: true,
//     },
//     {
//       name: 'advisorSellerId',
//       type: 'relation',
//       entity: Seller, // ✅ relation to Seller (advisor/vendor)
//       label: [{ languageCode: LanguageCode.en, value: 'Advisor / Seller' }],
//       nullable: true,
//     },
//     {
//       name: 'kycStatus',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Customer KYC Status' }],
//       options: [
//         { value: 'verified', label: [{ languageCode: LanguageCode.en, value: 'Verified' }] },
//         { value: 'not-verified', label: [{ languageCode: LanguageCode.en, value: 'Not Verified' }] },
//       ],
//       nullable: true,
//     },
//     {
//       name: 'PanNumber',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'PAN Number' }],
//       nullable: true,
//     },
//     {
//       name: 'Occupation',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Occupation' }],
//       options: [
//         { value: 'farmer', label: [{ languageCode: LanguageCode.en, value: 'Farmer' }] },
//         { value: 'salaried', label: [{ languageCode: LanguageCode.en, value: 'Salaried' }] },
//         { value: 'self-employed-business', label: [{ languageCode: LanguageCode.en, value: 'Self Employed (Business)' }] },
//         { value: 'self-employed-professional', label: [{ languageCode: LanguageCode.en, value: 'Self Employed (Professional)' }] },
//       ],
//       nullable: true,
//     },
//     {
//       name: 'AlternateNumber',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Alternate Contact Number' }],
//       nullable: true,
//     },
//     {
//       name: 'CibilScore',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'CIBIL Score' }],
//       nullable: true,
//     },
//     {
//       name: 'OrderId',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Order ID' }],
//       nullable: true,
//     },
//   ],

//   /**
//    * ===========================
//    * ORDER CUSTOM FIELDS
//    * ===========================
//    */
//   Order: [
//     {
//       name: 'scheduleVisit',
//       type: 'datetime',
//       label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visit Date & Time' }],
//       nullable: true,
//     },
//     {
//       name: 'salesPersonName',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Salesperson Name' }],
//       nullable: true,
//     },
//     {
//       name: 'salesPersonContact',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Salesperson Contact Number' }],
//       nullable: true,
//     },
//     {
//       name: 'salesPersonEmail',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Salesperson Email' }],
//       nullable: true,
//     },
//     {
//       name: 'advisorSellerId',
//       type: 'relation',
//       entity: Seller, // ✅ relation to Seller
//       label: [{ languageCode: LanguageCode.en, value: 'Advisor / Seller' }],
//       nullable: true,
//     },
//     {
//       name: 'visitStatus',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Visit Status' }],
//       options: [
//         { value: 'scheduled', label: [{ languageCode: LanguageCode.en, value: 'Scheduled' }] },
//         { value: 'completed', label: [{ languageCode: LanguageCode.en, value: 'Completed' }] },
//         { value: 'cancelled', label: [{ languageCode: LanguageCode.en, value: 'Cancelled' }] },
//       ],
//       nullable: true,
//     },
//     {
//       name: 'scheduledVisitDate',
//       type: 'datetime',
//       label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visit Date' }],
//       nullable: true,
//     },
//     {
//       name: 'advisorNotes',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Advisor Notes' }],
//       nullable: true,
//     },
//     {
//       name: 'loanType',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Loan Type' }],
//       nullable: true,
//     },
//   ],

//   /**
//    * ===========================
//    * SELLER (VENDOR) CUSTOM FIELDS
//    * ===========================
//    */
//   Seller: [
//     {
//       name: 'advisorType',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Advisor Type' }],
//       options: [
//         { value: 'gold-loan', label: [{ languageCode: LanguageCode.en, value: 'Gold Loan Advisor' }] },
//         { value: 'home-loan', label: [{ languageCode: LanguageCode.en, value: 'Home Loan Advisor' }] },
//         { value: 'vehicle-loan', label: [{ languageCode: LanguageCode.en, value: 'Vehicle Loan Advisor' }] },
//       ],
//       nullable: true,
//     },
//     {
//       name: 'serviceArea',
//       type: 'string',
//       label: [{ languageCode: LanguageCode.en, value: 'Service Area' }],
//       nullable: true,
//     },
//     {
//       name: 'rating',
//       type: 'float',
//       label: [{ languageCode: LanguageCode.en, value: 'Advisor Rating' }],
//       nullable: true,
//     },
//   ],
// },
customFields : {
  /**
   * ===========================
   * CUSTOMER CUSTOM FIELDS
   * ===========================
   */
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
      nullable: true,
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
      label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visits' }],
      nullable: true,
    },
    {
      name: 'advisorSellerId',
      type: 'relation',
      entity: Seller,
      label: [{ languageCode: LanguageCode.en, value: 'Advisor / Seller' }],
      nullable: true,
    },
    {
      name: 'kycStatus',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'KYC Status' }],
      options: [
        { value: 'verified', label: [{ languageCode: LanguageCode.en, value: 'Verified' }] },
        { value: 'not-verified', label: [{ languageCode: LanguageCode.en, value: 'Not Verified' }] },
      ],
      nullable: true,
    },
    {
      name: 'PanNumber',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'PAN Number' }],
      nullable: true,
    },
    {
      name: 'Occupation',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Occupation' }],
      options: [
        { value: 'farmer', label: [{ languageCode: LanguageCode.en, value: 'Farmer' }] },
        { value: 'salaried', label: [{ languageCode: LanguageCode.en, value: 'Salaried' }] },
        { value: 'self-employed-business', label: [{ languageCode: LanguageCode.en, value: 'Self Employed (Business)' }] },
        { value: 'self-employed-professional', label: [{ languageCode: LanguageCode.en, value: 'Self Employed (Professional)' }] },
      ],
      nullable: true,
    },
    {
      name: 'AlternateNumber',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Alternate Contact Number' }],
      nullable: true,
    },
    {
      name: 'CibilScore',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'CIBIL Score' }],
      nullable: true,
    },
    {
      name: 'OrderId',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Order ID' }],
      nullable: true,
    },
    {
      name: 'preferredContactMethod',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Preferred Contact Method' }],
      options: [
        { value: 'phone', label: [{ languageCode: LanguageCode.en, value: 'Phone' }] },
        { value: 'whatsapp', label: [{ languageCode: LanguageCode.en, value: 'WhatsApp' }] },
        { value: 'email', label: [{ languageCode: LanguageCode.en, value: 'Email' }] },
      ],
      nullable: true,
    },
  ],

  /**
   * ===========================
   * ORDER CUSTOM FIELDS
   * ===========================
   */
  Order: [
    {
      name: 'scheduleVisit',
      type: 'datetime',
      label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visit Date & Time' }],
      nullable: true,
    },
    {
      name: 'scheduledVisitDate',
      type: 'datetime',
      label: [{ languageCode: LanguageCode.en, value: 'Scheduled Visit Date' }],
      nullable: true,
    },
    {
      name: 'visitStatus',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Visit Status' }],
      options: [
        { value: 'pending', label: [{ languageCode: LanguageCode.en, value: 'Pending' }] },
        { value: 'scheduled', label: [{ languageCode: LanguageCode.en, value: 'Scheduled' }] },
        { value: 'completed', label: [{ languageCode: LanguageCode.en, value: 'Completed' }] },
        { value: 'cancelled', label: [{ languageCode: LanguageCode.en, value: 'Cancelled' }] },
      ],
      nullable: true,
    },
    {
      name: 'advisorSellerId',
      type: 'relation',
      entity: Seller,
      label: [{ languageCode: LanguageCode.en, value: 'Advisor / Seller' }],
      nullable: true,
    },
    {
      name: 'advisorAssignedBy',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Assigned By (Admin)' }],
      nullable: true,
    },
    {
      name: 'advisorAssignedAt',
      type: 'datetime',
      label: [{ languageCode: LanguageCode.en, value: 'Advisor Assigned At' }],
      nullable: true,
    },
    {
      name: 'advisorNotes',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Advisor Notes' }],
      nullable: true,
    },
    {
      name: 'visitOutcome',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Visit Outcome' }],
      nullable: true,
    },
    {
      name: 'loanType',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Loan Type' }],
      nullable: true,
    },
    {
      name: 'salesPersonName',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Salesperson Name' }],
      nullable: true,
    },
    {
      name: 'salesPersonContact',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Salesperson Contact' }],
      nullable: true,
    },
    {
      name: 'salesPersonEmail',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Salesperson Email' }],
      nullable: true,
    },
    {
      name: 'visitMode',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Visit Mode' }],
      options: [
        { value: 'in-person', label: [{ languageCode: LanguageCode.en, value: 'In Person' }] },
        { value: 'virtual', label: [{ languageCode: LanguageCode.en, value: 'Virtual' }] },
      ],
      nullable: true,
    },
    {
      name: 'visitLocation',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Visit Location' }],
      nullable: true,
    },
    {
      name: 'customerSnapshot',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Customer Snapshot (JSON)' }],
      nullable: true,
    },
    {
      name: 'communicationConsent',
      type: 'boolean',
      label: [{ languageCode: LanguageCode.en, value: 'Communication Consent' }],
      nullable: true,
    },
    {
      name: 'followUpRequired',
      type: 'boolean',
      label: [{ languageCode: LanguageCode.en, value: 'Follow-up Required' }],
      nullable: true,
    },
    {
      name: 'orderReference',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Order Reference Code' }],
      nullable: true,
    },
  ],

  /**
   * ===========================
   * SELLER CUSTOM FIELDS
   * ===========================
   */
  Seller: [
    {
      name: 'advisorType',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Advisor Type' }],
      options: [
        { value: 'gold-loan', label: [{ languageCode: LanguageCode.en, value: 'Gold Loan Advisor' }] },
        { value: 'home-loan', label: [{ languageCode: LanguageCode.en, value: 'Home Loan Advisor' }] },
        { value: 'vehicle-loan', label: [{ languageCode: LanguageCode.en, value: 'Vehicle Loan Advisor' }] },
        { value: 'lap', label: [{ languageCode: LanguageCode.en, value: 'Loan Against Property Advisor' }] },
      ],
      nullable: true,
    },
    {
      name: 'serviceArea',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Service Area' }],
      nullable: true,
    },
    {
      name: 'rating',
      type: 'float',
      label: [{ languageCode: LanguageCode.en, value: 'Advisor Rating' }],
      nullable: true,
    },
    {
      name: 'workingHours',
      type: 'string',
      label: [{ languageCode: LanguageCode.en, value: 'Working Hours / Availability' }],
      nullable: true,
    },
    {
      name: 'isActive',
      type: 'boolean',
      label: [{ languageCode: LanguageCode.en, value: 'Active Advisor' }],
      nullable: true,
      defaultValue: true,
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

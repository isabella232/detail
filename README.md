# DETAIL 

Welcome to an end-to-end decentralised data ecosystem! 

## What is DETAIL? 

**DETAIL** stands for Decentralised Extract Transform Automate Integrate Load. 

The decentralised web is like the web you know, only the way Tim-Berners Lee envisaged it, ie the web that does not rely on centralised servers or operators. 

The words ‘Extract, Transfer, Load (ETL)’ in our acronym identify the computing process of gathering data from multiple sources and consolidating it into a destination system, which represents the data differently from the source. 

The ‘Automated Integration’ part of our acronym refers to the deep learning we acquire by applying different types of data processing algorithms to a progressively large amount of data. 

### The decentralised web and its benefits

The decentralised web has two significant differentiators from the web, as we know it today: 
The decentralised web is enabled through peer-to-peer connectivity and storage, 
In a distributed environment, each data set has an embedded set of annotations, which describes the data and allows us to call it, on the basis of what the data is (data description) rather than where it sits (the old centralised server norm). 

On these attributes of the decentralised web lie its three invaluable benefits; innate security, open data access and user data ownership: 
Security: Decentralised data storage, as demonstrated in blockchains, reduces the risks of a data hack or power shortage that affect centralised databases. This is because decentralisation means that, if a single node is compromised or goes down, the network can continue to update and operate. 
Open data access: Lack of centralised servers means that no user data is concentrated in the hands of a few, who can impose censorship, or use your private information to target ads to you.  
User data ownership:  The decentralised web presents mechanisms like cryptographic signatures and token-enabled voting, that empowers users to control their data and allow or block access to it. 

### Turning centralised data to decentralised data processing logic

To enable this innate security and full data control by the user, developers have focused so far on decentralising file storage. However, files are only one element of the data storage landscape. 

While focusing on file storage enables the decentralised storage of large, arbitrary files, it does not warrant data integrity, nor does it cater to retrieving smaller data fields that make up micro-transactions of a fixed size. 

In order to enable both data integrity and cater to smaller data transactions, Alice pioneers the decentralisation of the data processing logic. We don’t stop at decentralising our data storage, but rather we decentralise the ETL (Extract, Transfer, Load) processes we follow to translate every dataset in a contextual UI representation. This way we achieve a fully decentralised infrastructure in three steps: 

#### 1. Decentralise data storage:
For the decentralised storage of our data, we use Arweave, which backs data with perpetual endowments, on a collectively owned hard drive, composed of available storage rented out to Arweave by their community of developers. 

#### 2. Decentralise data processing logic:
Each type of data processing logic we create generates a data schema/a data processing framework. The first data schema we produced in DETAIL’s first GitHub commit represents our work with Vodafone Foundation’s Instant Network Schools’ programme- INS. 

Instant Network Schools was set up in 2013 by Vodafone Foundation and UNHCR, the UN Refugee Agency, to give children, living in refugee camps in 4 African countries, access to digital learning content and the internet, improving the quality of education in some of the most marginalised communities.

Vodafone Foundation gathers data on the effectiveness of the INS programme, through surveys with the teachers and students, on a continuous basis. Vodafone Foundation’s objectives are (a) to increase the usage of digital/INS lessons in the refugee camps’ schools, (b) to enable children to acquire ICT skills, (c) to increase student attendance, and (d) to improve students’ exam results, at a comparable level with the national average. These objectives need to be benchmarked across countries, refugee camps, and schools to compare progress and enable predictive and prescriptive analytics for the successful delivery of the INS programme at every unit level (school, camp, country, global). 

This very unit-based filtering, as well as the differentiation of the beneficiaries’ role (student/teacher) and gender (male/female) create a set of dependent variables, whose format we patternise into a data schema/a data processing framework. Then for this data schema (say data schema No1), we write a script that translates a given dataset into a specific aggregated representation. This way, we automate both the data analysis and its visualisation, for any given set of data, whose required interpretation falls into data schema No1. 

By gradually acquiring a progressively large number of datasets, which reflect different data filtering requirements, we’ll create a range of data processing frameworks, which we’ll correlate automatically with certain UI representations. So for example, dataset 1 which has x, y, z impact objectives or follows the SDG impact measurement framework requires data processing logic No1 and generates X sets of visualisation charts. 

And this is where machine learning modeling will be required; as we get more and more data, we’ll start standardising several data schemas, and we’ll write machine learning algorithms that will correlate raw datasets to the relevant data frameworks. These algorithms will fully automate the descriptive, predictive and prescriptive analysis of the data. The sources of the raw datasets can be anything from a simple csv/excel, an API connection with survey software, or IoT devices. 

So when we talk about decentralising our data processing logic, we mean that we place/store in a decentralised location these different data frameworks, from an individual data processing schema, all the way up to the amalgamation of these frameworks, over machine learning algorithms. This way anyone can check our scripts and data structures, and contribute with suggestions for improvements. 

#### 3. Decentralised deployment:
To enable a fully decentralised architecture and to solve the data accessibility and user control issues, we also decentralise the deployment of our frontend application. 

To decentralise our frontend deployment we use ArGo, a deployment service platform, which sits on top of the Arweave decentralised storage system. 

Achieving decentralisation on these 3 levels means that we’ll be able to follow the whole trail of data processing, from data sources and original CSVs to data processing algorithms and most used data frameworks. 

## DETAIL contains the following elements

### Backend - data processing pipeline

#### Extract

Extraction scripts are located in the [extract](https://github.com/alice-si/detail/tree/master/data/extract) folder.
They are responsible for uploading the local file to the decentralised storage, attaching semantic tags, cryptographically signing the content and covering all the network fees.

#### Transform

Data transfomation scripts are located in the [transform](https://github.com/alice-si/detail/tree/master/data/transform) folder.
They process the raw data, aggregate values, perform calculations and package the results into hierarchical data structures. 
The core executor [module](https://github.com/alice-si/detail/tree/master/data/transform/process.js) loads the data from the decentralised storage and applies the processing logic from selected transformation scripts. 
The project currently contains two transformation scripts:

1. [ins-csv-transformer](https://github.com/alice-si/detail/blob/master/data/transform/ict-csv-transformer.js) - process data about students attendance by aggregating lessons locations and dates. 

2. [ict-csv-transformer](https://github.com/alice-si/detail/blob/master/data/transform/ict-csv-transformer.js) - process data about students skills by aggregating lessons locations and skills categories. The script needs to traverse the object hierarchy two times (top-bottom and bottom-top) to first organised the data and then to propagate the calculation of average statistics. 

#### Load

Data loading scripts are located in the [load](https://github.com/alice-si/detail/tree/master/data/load) folder.
They are responsible for loading the content form the decentralised storage.

#### Source

This folder contains raw datasets that could be uploaded to the decentralised storage, processed and linked to the visualisation UI. 


### Frontend - data visualisation

The code is implemented using the Vue framework and located in the [src](https://github.com/alice-si/detail/tree/master/data/load). The data visualisation is based on the chart.js library. 

#### Project setup


## Installs dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```


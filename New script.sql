USE [master]
GO
/****** Object:  Database [QuatarPayemnt]    Script Date: 11/3/2017 1:38:03 AM ******/
CREATE DATABASE [QuatarPayemnt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QuatarPayemnt', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\QuatarPayemnt.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QuatarPayemnt_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\QuatarPayemnt_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [QuatarPayemnt] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QuatarPayemnt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QuatarPayemnt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET ARITHABORT OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QuatarPayemnt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QuatarPayemnt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QuatarPayemnt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QuatarPayemnt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [QuatarPayemnt] SET  MULTI_USER 
GO
ALTER DATABASE [QuatarPayemnt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QuatarPayemnt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QuatarPayemnt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QuatarPayemnt] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [QuatarPayemnt] SET DELAYED_DURABILITY = DISABLED 
GO
USE [QuatarPayemnt]
GO
/****** Object:  Table [dbo].[TBLQU_CLIENTMASTER]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBLQU_CLIENTMASTER](
	[ID] [int] IDENTITY(1,1000) NOT NULL,
	[ClientID] [nvarchar](50) NULL,
	[ClientfirstName] [nvarchar](50) NULL,
	[ClientLastName] [nvarchar](50) NULL,
	[Address] [nvarchar](max) NULL,
	[PhoneNo] [nvarchar](50) NULL,
	[MobileNo] [nvarchar](50) NOT NULL,
	[EmailID] [nvarchar](50) NOT NULL,
	[Nationality] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL CONSTRAINT [DF_TBLQU_CLIENTMASTER_CreatedDate]  DEFAULT (getdate()),
	[ModifiedDate] [datetime] NULL CONSTRAINT [DF_TBLQU_CLIENTMASTER_ModifiedDate]  DEFAULT (getdate()),
 CONSTRAINT [PK_TBLQU_CLIENTMASTER_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TBLQU_PAYMENTHIS]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBLQU_PAYMENTHIS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[vpc_MerchTxnRef] [nvarchar](50) NOT NULL,
	[vpc_TxnResponseCode] [nvarchar](50) NOT NULL,
	[vpc_Amount] [nvarchar](50) NOT NULL,
	[vpc_Command] [nvarchar](50) NOT NULL,
	[vpc_Version] [nvarchar](50) NOT NULL,
	[vpc_OrderInfo] [nvarchar](50) NOT NULL,
	[vpc_Merchant] [nvarchar](50) NOT NULL,
	[vpc_BatchNo] [nvarchar](50) NOT NULL,
	[vpc_Card] [nvarchar](50) NOT NULL,
	[vpc_ReceiptNo] [nvarchar](50) NOT NULL,
	[vpc_AuthorizeId] [nvarchar](50) NOT NULL,
	[vpc_AcqResponseCode] [nvarchar](50) NOT NULL,
	[vpc_TransactionNo] [nvarchar](50) NOT NULL,
	[vpc_Message] [nvarchar](50) NOT NULL,
	[created_date] [datetime] NOT NULL,
	[modifed_date] [datetime] NOT NULL,
 CONSTRAINT [PK_TBLQU_PAYMENTHIS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TBLQU_PAYMENTMASTER]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TBLQU_PAYMENTMASTER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [nvarchar](50) NULL,
	[BookingRef] [nvarchar](50) NULL,
	[PackageName] [nvarchar](50) NULL,
	[Amount] [nvarchar](50) NOT NULL,
	[Currency] [nvarchar](50) NULL,
	[Status] [int] NULL,
	[Var_Status] [nvarchar](50) NULL,
	[payment_id] [nvarchar](50) NULL,
	[payment_token] [nvarchar](50) NULL,
	[created_date] [datetime] NULL,
	[modifed_date] [datetime] NULL,
	[booked_by] [nvarchar](50) NULL,
	[currencyrate] [nvarchar](50) NULL,
	[PaymentDate] [varchar](50) NULL,
	[TermAndCondition] [bit] NULL,
	[Discription] [nvarchar](max) NULL,
	[FailedAttempt] [int] NULL CONSTRAINT [DF_TBLQU_PAYMENTMASTER_FailedAttempt]  DEFAULT ((0)),
	[FailedAttemptLimit] [int] NULL CONSTRAINT [DF_TBLQU_PAYMENTMASTER_FailedAttemptLimit]  DEFAULT ((5)),
	[IsBlocked] [bit] NOT NULL CONSTRAINT [DF_TBLQU_PAYMENTMASTER_IsBlocked]  DEFAULT ((0)),
 CONSTRAINT [PK_TBLQU_PAYMENTMASTER_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TBLQU_PAYMENTRate]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBLQU_PAYMENTRate](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Currency_From] [nvarchar](50) NOT NULL,
	[Currency_to] [nvarchar](50) NOT NULL,
	[rate] [nvarchar](50) NOT NULL,
	[modifie_date] [datetime] NOT NULL DEFAULT (getdate()),
 CONSTRAINT [PK_TBLQU_PAYMENTRate] PRIMARY KEY CLUSTERED 
(
	[Currency_From] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TBLQU_User_Master]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING OFF
GO
CREATE TABLE [dbo].[TBLQU_User_Master](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[emailid] [varchar](50) NULL,
	[mobileno] [int] NULL,
	[userid] [varchar](50) NOT NULL,
	[password] [varchar](50) NULL,
	[user_type] [int] NULL,
 CONSTRAINT [PK_TBLQU_User_Master] PRIMARY KEY CLUSTERED 
(
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TBLQU_UserLocation]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBLQU_UserLocation](
	[BookingRef] [nvarchar](255) NULL,
	[IP] [nvarchar](255) NULL,
	[CountryCode] [nvarchar](255) NULL,
	[CountryName] [nvarchar](255) NULL,
	[RegionCode] [nvarchar](255) NULL,
	[RegionName] [nvarchar](255) NULL,
	[City] [nvarchar](255) NULL,
	[ZipCode] [nvarchar](255) NULL,
	[TimeZone] [nvarchar](255) NULL,
	[Latitude] [nvarchar](255) NULL,
	[Longitude] [nvarchar](255) NULL,
	[UserLocationPK] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_TBLQU_UserLocation] PRIMARY KEY CLUSTERED 
(
	[UserLocationPK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  StoredProcedure [dbo].[GetAdminData]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAdminData]
AS
BEGIN
SELECT  
	TCM.ClientID 'Client_ID',
	TCM.ClientfirstName+' '+ TCM.ClientLastName 'Client_nAME',
	TCM.[Address] 'CLIENT_Address',
	TCM.MobileNo 'Client_MobileNo',
	TCM.EmailID 'Client_Email',
	TCM.Nationality 'Clinet_Nationallty',
	TPM.BookingRef +' ('+(SELECT CAST (COUNT(*) AS VARCHAR(10)) FROM TBLQU_PAYMENTHIS tph WHERE tph.vpc_MerchTxnRef=TPM.BookingRef) + ') ' 'Client_BookingRef',
	TPM.PackageName 'Client_Packegname',
	TPM.Amount 'Clinet_Amount',
	TPM.Currency 'Clinet_Currency',
	CASE WHEN  tpm.[Status] = 0 THEN TPM.Var_Status ELSE 'Pending' END  'Payment_Status',
	'' 'user_type',
	'' 'user_name',
	(SELECT TOP 1 tph.vpc_TransactionNo FROM TBLQU_PAYMENTHIS tph WHERE tph.vpc_MerchTxnRef=TPM.BookingRef ORDER BY created_date DESC) 'BankTrID',
	TPM.payment_token   'TRID',
	(SELECT TOP 1 CAST (tph.modifed_date AS VARCHAR(10)) FROM TBLQU_PAYMENTHIS tph WHERE tph.vpc_MerchTxnRef=TPM.BookingRef ORDER BY created_date DESC ) 'modifieddate',
	TPM.FailedAttempt 'FailedAttempt',
	TPM.FailedAttemptLimit 'FailedAttemptLimit',
	TPM.IsBlocked 'IsBlocked',
	tpm.booked_by 'CreatedBy',
	CAST (TPM.created_date AS VARCHAR(11)) 'CreatedDate' 

FROM TBLQU_CLIENTMASTER TCM,TBLQU_PAYMENTMASTER TPM
WHERE TCM.ClientID = TPM.ClientID ORDER BY TPM.created_date DESC
END

GO
/****** Object:  StoredProcedure [dbo].[getDataForBooking]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getDataForBooking]
	@Booking varchar(50)
	
AS
BEGIN
	
	SELECT vpc_Message,cast(created_date as varchar(50)) created_date,vpc_ReceiptNo from TBLQU_PAYMENTHIS where vpc_MerchTxnRef=@Booking
END


GO
/****** Object:  StoredProcedure [dbo].[update_paymentMaster]    Script Date: 11/3/2017 1:38:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[update_paymentMaster]
     
		@PackageName varchar(50),
		@Currency  varchar(50),
		@Amount varchar(50),
		@currencyrate  varchar(50),
		@BookingRef  varchar(50),
		@FailedAttemptLimit int,
		@IsBlocked bit
       
AS
BEGIN
       UPDATE TBLQU_PAYMENTMASTER SET 
		   PackageName = @PackageName,
		   Currency = @Currency,
		   modifed_date = getdate(),
		   Amount = @Amount,
		   currencyrate = @currencyrate,
		   FailedAttemptLimit = @FailedAttemptLimit,
		   IsBlocked = @IsBlocked
	   WHERE BookingRef = @BookingRef
END
                  

GO
USE [master]
GO
ALTER DATABASE [QuatarPayemnt] SET  READ_WRITE 
GO

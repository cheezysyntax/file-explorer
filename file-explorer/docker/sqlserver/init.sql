IF DB_ID(N'FilesDb') IS NULL
BEGIN
    CREATE DATABASE [FilesDb];
END;
GO

USE [FilesDb];
GO

IF OBJECT_ID(N'dbo.Files', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Files]
    (
        [Id] INT IDENTITY(1,1) NOT NULL CONSTRAINT [PK_Files] PRIMARY KEY,
        [Name] TEXT NOT NULL,
        [Path] TEXT NOT NULL,
        [IconType] TEXT NOT NULL,
        [Modify Date] DATE NOT NULL,
        [Upload Date] DATE NOT NULL
    );
END;
GO

IF COL_LENGTH(N'dbo.Files', N'ImageType') IS NOT NULL
BEGIN
    ALTER TABLE [dbo].[Files] DROP COLUMN [ImageType];
END;
GO

UPDATE [dbo].[Files]
SET [IconType] = LEFT(
    CONVERT(NVARCHAR(MAX), [IconType]),
    LEN(CONVERT(NVARCHAR(MAX), [IconType])) - 4
)
WHERE RIGHT(CONVERT(NVARCHAR(MAX), [IconType]), 4) = N'.png';
GO

INSERT INTO [dbo].[Files]
    ([Name], [Path], [IconType], [Modify Date], [Upload Date])
SELECT [Name], [Path], [IconType], [Modify Date], [Upload Date]
FROM (VALUES
    (N'Product brief.pdf', N'/documents/product-brief.pdf', N'pdf', CAST('2026-08-12' AS DATE), CAST('2026-08-01' AS DATE)),
    (N'Brand assets.psd', N'/design/brand-assets.psd', N'psd', CAST('2026-08-15' AS DATE), CAST('2026-08-03' AS DATE)),
    (N'Roadmap.xlsx', N'/planning/roadmap.xlsx', N'xls', CAST('2026-08-10' AS DATE), CAST('2026-07-28' AS DATE)),
    (N'Usage notes.txt', N'/notes/usage-notes.txt', N'txt', CAST('2026-08-17' AS DATE), CAST('2026-08-17' AS DATE)),
    (N'Preview image.jpg', N'/previews/preview-image.jpg', N'jpg', CAST('2026-08-18' AS DATE), CAST('2026-08-05' AS DATE))
) AS DummyFiles ([Name], [Path], [IconType], [Modify Date], [Upload Date])
WHERE NOT EXISTS (
    SELECT 1
    FROM [dbo].[Files] AS ExistingFile
    WHERE CONVERT(NVARCHAR(MAX), ExistingFile.[Name]) = DummyFiles.[Name]
);
GO

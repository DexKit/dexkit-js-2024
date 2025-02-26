'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaDownload, FaFolder, FaFolderOpen, FaExternalLinkAlt } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

interface BrandAsset {
  name: string;
  type: 'folder' | 'image';
  url?: string;
  children?: BrandAsset[];
}

export default function BrandMaterial() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);
  const pdfUrl = '/branding/docs/Brand_Guidelines.pdf';

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'brandMaterial.title' });
    document.title = `${pageTitle} | DexKit`;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [intl]);

  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const brandAssets: BrandAsset[] = [
    {
      name: "Normal logo DexKit",
      type: "folder",
      children: [
        {
          name: "Imagotype",
          type: "folder",
          children: [
            { name: "01_Imagotype_DexKit.png", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/01_Imagotype_DexKit.png" },
            { name: "01_Imagotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/01_Imagotype_DexKit.svg" },
            { name: "02_Imagotype_DexKit.png", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/02_Imagotype_DexKit.png" },
            { name: "02_Imagotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/02_Imagotype_DexKit.svg" },
            { name: "black_Imagotype_DexKit.png", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/black_Imagotype_DexKit.png" },
            { name: "black_Imagotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/black_Imagotype_DexKit.svg" },
            { name: "white_Imagotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Imagotype/white_Imagotype_DexKit.svg" }
          ]
        },
        {
          name: "Isotype",
          type: "folder",
          children: [
            { name: "black_Isotype_DexKit.png", type: "image", url: "/branding/Normal_logo/Normal_Isotype/black_Isotype_DexKit.png" },
            { name: "black_Isotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Isotype/black_Isotype_DexKit.svg" },
            { name: "orange_Isotype_DexKit.png", type: "image", url: "/branding/Normal_logo/Normal_Isotype/orange_Isotype_DexKit.png" },
            { name: "orange_Isotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Isotype/orange_Isotype_DexKit.svg" },
            { name: "white_Isotype_DexKit.png", type: "image", url: "/branding/Normal_logo/Normal_Isotype/white_Isotype_DexKit.png" },
            { name: "white_Isotype_DexKit.svg", type: "image", url: "/branding/Normal_logo/Normal_Isotype/white_Isotype_DexKit.svg" }
          ]
        }
      ]
    },
    {
      name: "Outline logo DexKit",
      type: "folder",
      children: [
        {
          name: "Imagotype",
          type: "folder",
          children: [
            { name: "Outline_01_Imagotype_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_01_Imagotype_DexKit.png" },
            { name: "Outline_01_Imagotype_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_01_Imagotype_DexKit.svg" },
            { name: "Outline_02_Imagotype_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_02_Imagotype_DexKit.png" },
            { name: "Outline_02_Imagotype_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_02_Imagotype_DexKit.svg" },
            { name: "Outline_black_Imago_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_black_Imago_DexKit.png" },
            { name: "Outline_black_Imago_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_black_Imago_DexKit.svg" },
            { name: "Outline_white_Imago_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_white_Imago_DexKit.png" },
            { name: "Outline_white_Imago_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Imagotype/Outline_white_Imago_DexKit.svg" }
          ]
        },
        {
          name: "Isotype",
          type: "folder",
          children: [
            {
              name: "PNG",
              type: "folder",
              children: [
                { name: "Outline_black_Isotype_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Isotype/Outline_Isotype_PNG/Outline_black_Isotype_DexKit.png" },
                { name: "Outline_orange_Isotype_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Isotype/Outline_Isotype_PNG/Outline_orange_Isotype_DexKit.png" },
                { name: "Outline_white_Isotype_DexKit.png", type: "image", url: "/branding/Outline_logo/Outline_Isotype/Outline_Isotype_PNG/Outline_white_Isotype_DexKit.png" }
              ]
            },
            {
              name: "SVG",
              type: "folder",
              children: [
                { name: "Outline_black_Isotype_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Isotype/Outline_Isotype_SVG/Outline_black_Isotype_DexKit.svg" },
                { name: "Outline_orange_Isotype_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Isotype/Outline_Isotype_SVG/Outline_orange_Isotype_DexKit.svg" },
                { name: "Outline_white_Isotype_DexKit.svg", type: "image", url: "/branding/Outline_logo/Outline_Isotype/Outline_Isotype_SVG/Outline_white_Isotype_DexKit.svg" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Powered by DexKit",
      type: "folder",
      children: [
        { name: "Powered_by[black].png", type: "image", url: "/branding/Powered_by/Powered_by[black].png" },
        { name: "Powered_by[black].svg", type: "image", url: "/branding/Powered_by/Powered_by[black].svg" },
        { name: "Powered_by[versions].png", type: "image", url: "/branding/Powered_by/Powered_by[versions].png" },
        { name: "Powered_by[white].png", type: "image", url: "/branding/Powered_by/Powered_by[white].png" },
        { name: "Powered_by[white].svg", type: "image", url: "/branding/Powered_by/Powered_by[white].svg" }
      ]
    }
  ];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName)
        ? prev.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  const renderAsset = (asset: BrandAsset, depth = 0) => {
    const isExpanded = expandedFolders.includes(asset.name);
    const paddingLeft = `${depth * 20}px`;

    if (asset.type === 'folder') {
      return (
        <div key={asset.name}>
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded text-gray-800"
            style={{ paddingLeft }}
            onClick={() => toggleFolder(asset.name)}
          >
            {isExpanded ? <FaFolderOpen className="mr-2 text-yellow-500" /> : <FaFolder className="mr-2 text-yellow-500" />}
            <span>{asset.name}</span>
          </div>
          {isExpanded && asset.children && (
            <div className="ml-4">
              {asset.children.map(child => renderAsset(child, depth + 1))}
            </div>
          )}
        </div>
      );
    } else {
      const fileName = asset.name.split('.').slice(0, -1).join('.');
      return (
        <div 
          key={asset.name} 
          className="flex items-center justify-between hover:bg-gray-200 p-2 rounded text-gray-800 cursor-pointer"
          style={{ paddingLeft }}
          onClick={() => window.open(asset.url, '_blank')}
        >
          <div className="flex items-center flex-grow">
            <div className="w-6 h-6 mr-2 relative flex-shrink-0">
              <Image 
                src={asset.url!} 
                alt={asset.name} 
                layout="fill" 
                objectFit="contain"
              />
            </div>
            <span className="truncate">{fileName}</span>
          </div>
          <FaDownload className="text-purple-600 ml-2" />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-0 w-full ${isMobile ? 'text-center' : 'md:w-1/2 md:text-left'}`}>
              <FormattedMessage id="brandMaterial.title" />
            </h1>
            <p className={`text-sm sm:text-base md:text-lg w-full ${isMobile ? 'text-center' : 'md:w-1/2 md:pl-4 md:text-left'}`}>
              <FormattedMessage id="brandMaterial.description" />
            </p>
          </div>
        </div>
      </div>
  
      <div className="bg-white">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
            <div className="md:col-span-2 bg-gray-100 p-6 rounded-lg overflow-auto" style={{ maxHeight: isMobile ? '400px' : '600px' }}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                <FormattedMessage id="brandMaterial.availableFiles" />
              </h2>
              <div className="space-y-2">
                {brandAssets.map(asset => renderAsset(asset))}
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg flex flex-col" style={{ height: 'fit-content' }}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                <FormattedMessage id="brandMaterial.pdfViewer" />
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">
                <FormattedMessage id="brandMaterial.pdfDescription" />
              </p>
              <a 
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-400 text-black px-4 py-2 rounded hover:bg-orange-500 transition-colors inline-flex items-center self-start text-sm sm:text-base"
              >
                <FaExternalLinkAlt className="mr-2" />
                <FormattedMessage id="brandMaterial.viewPdf" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { type SchemaTypeDefinition } from "sanity";
import carouselType from "./schemaTypes/carousel";
import news from "./schemaTypes/news";
import notice from "./schemaTypes/notice";
import teamMember from "./schemaTypes/teamMember";
import page from './schemaTypes/pageType'; // Adjust the path if necessary
import imageGallery  from "./schemaTypes/imageGallery";
import videoGallery  from "./schemaTypes/videoGallery";
import category from './schemaTypes/category';
import popop from "./schemaTypes/popop";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carouselType, news, notice, teamMember, page, imageGallery, videoGallery,category,popop ],
};

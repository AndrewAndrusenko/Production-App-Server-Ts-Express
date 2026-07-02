import express, { Request, Response } from 'express';
import { APPS_CONFIG } from '../env/apps-configs';
export const router = express.Router();

/* GET users listing. */
router.all('/ssngrx/*', function(req, res) { 
  res.sendFile(APPS_CONFIG.get('ssngrx')?.urlPath+'index.html'); 
});
router.all('/rtq/*', function(req, res) { 
  res.sendFile(APPS_CONFIG.get('rtq')?.urlPath+'index.html'); 
});
router.all('/aam/*', function(req, res) { 
  res.sendFile(APPS_CONFIG.get('aam')?.urlPath+'index.html'); 
});
router.all('/crm/*', function(req, res) { 
  res.sendFile(APPS_CONFIG.get('crm')?.urlPath+'index.html'); 
});
router.all('/cv-site/*', function(req, res) { 
  res.sendFile(APPS_CONFIG.get('cv_site')?.urlPath+'index.html'); 
});
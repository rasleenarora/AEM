package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.investec.boqs.redesign.bean.PhotoList;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.PropertyUtils;

public class PhotoGalleryCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {

		// String[] photolist = properties.get("photolist", String[].class);
		// List<PhotoList> photoGalleryList =
		// this.getPhotoGalleryList(photolist, slingRequest);

		String photoDirectoryPath = properties.get("photodirectorypath", "");
		List<PhotoList> photoGalleryList = this.getPhotoGalleryList(photoDirectoryPath, slingRequest);

		Gson gson = new Gson();
		JsonElement element = gson.toJsonTree(photoGalleryList);
		JsonArray listPhotoGalleryJson = element.getAsJsonArray();

		putModel("photoGalleryList", photoGalleryList);
		putModel("listPhotoGalleryJson", listPhotoGalleryJson);
		putModel("galleryname", properties.get("galleryname", ""));
	}

	/*public List<PhotoList> getPhotoGalleryList(String[] listPhotoGallery, SlingHttpServletRequest slingRequest) {
		List<PhotoList> photoGalleryList = new ArrayList<PhotoList>();
		try {
			if (listPhotoGallery != null) {
				for (int i = 0; i < listPhotoGallery.length; i++) {
					if (!StringUtil.isEmpty(listPhotoGallery[i])) {
						PhotoList photoGallery = PhotoGalleryUtils.getPhotoGallery(listPhotoGallery[i]);
						photoGalleryList.add(photoGallery);
					}
				}
			}
		} catch (Exception e) {
			LOG.error("Error getPhotoGalleryList(String[], slingRequest):" + e.toString());
		}
		return photoGalleryList;
	}*/

	public List<PhotoList> getPhotoGalleryList(String photoDirectoryPath, SlingHttpServletRequest slingRequest) {
		List<PhotoList> photoGalleryList = new ArrayList<PhotoList>();
		try {
			if (StringUtils.isNotBlank(photoDirectoryPath)) {
				Node parent = PropertyUtils.getNode(slingRequest, photoDirectoryPath);
				if (null != parent) {
					NodeIterator children = parent.getNodes();
					while (children.hasNext()) {
						Node child = children.nextNode();
						String path = child.getPath();

						String caption = "";
						String alt = "";

						ValueMap props = PropertyUtils.getValueMap(slingRequest, path + BOQSConstant.ASSET_METADATA_PATH);
						if(null != props){
							caption = props.get(BOQSConstant.ASSET_DESCRIPTION_PROPERTY, "");
							alt = props.get(BOQSConstant.ASSET_TITLE_PROPERTY, "");
						}
						
						if (!BOQSConstant.JCR_CONTENT.equals(child.getName()) && checkExtension(path)) {
							photoGalleryList.add(new PhotoList(path, caption, alt));
						}
					}
				}
			}
		} catch (Exception e) {
			LOG.error("Error getPhotoGalleryList(String, slingRequest):" + e.toString());
		}
		return photoGalleryList;
	}

	/**
	 * Check Image Extensions
	 * @param path
	 * @return
	 */
	public boolean checkExtension(String path) {
		if (StringUtils.isNotBlank(path)) {
			String[] allow = { ".jpg", ".png", ".gif", ".bmp", ".jpeg" };
			for (String ext : allow) {
				if (path.toLowerCase().endsWith(ext)) {
					return true;
				}
			}
		}
		return false;
	}
}
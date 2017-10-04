package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.investec.boqs.redesign.bean.CustomXtypeWithIcon;
import com.investec.boqs.redesign.bean.TreePage;
import com.investec.boqs.redesign.utils.CommonUtils;

public class TopNavigationPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {

		if (null == currentNode) {
			return;
		}

		InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));

		// get value input from dialog and put value into model to use in jsp
		// tab 1
		putModel("specialtieslabel", iProperties.getInherited("specialtieslabel", "Specialties"));
		putModel("specialtiesurl", CommonUtils.getProperURL(iProperties.getInherited("specialtiesurl", ""), slingRequest));
		putModel("primaryspecialtieslabel", iProperties.getInherited("primaryspecialtieslabel", "Distinctive banking for:"));
		String[] primarySpecialtiesList = iProperties.getInherited("primaryspecialtieslist", String[].class);
		putModel("otherspecialtieslabel", iProperties.getInherited("otherspecialtieslabel", "Other Specialties"));
		String[] otherSpecialtiesList = iProperties.getInherited("otherspecialtieslist", String[].class);
		putModel("viewalllabel", iProperties.getInherited("viewalllabel", "View all"));
		putModel("viewalltargeturl", CommonUtils.getProperURL(iProperties.getInherited("viewalltargeturl", ""), slingRequest));

		putPageList("primaryspecialtieslist", primarySpecialtiesList);
		putPageList("otherspecialtieslist", otherSpecialtiesList);

		// tab 2
		putModel("productslabel", iProperties.getInherited("productslabel", "Products"));
		putModel("productsurl", CommonUtils.getProperURL(iProperties.getInherited("productsurl", ""), slingRequest));
		putModel("primaryproductslabel", iProperties.getInherited("primaryproductslabel", "Our products include"));
		putModel("findmoreproductslabel", iProperties.getInherited("findmoreproductslabel", "Find more products"));
		putModel("findmoredescription", iProperties.getInherited("findmoredescription", ""));
		putModel("productfindericonpath", iProperties.getInherited("productfindericonpath", ""));
		putModel("productfinderlabel", iProperties.getInherited("productfinderlabel", "Product Finder"));
		putModel("productfindertargeturl", CommonUtils.getProperURL(iProperties.getInherited("productfindertargeturl", ""), slingRequest));

		String savingsaccountsrootpage = iProperties.getInherited("savingsaccountsrootpage", "");
		Boolean savingsaccountsusemanual = iProperties.getInherited("savingsaccountsusemanual", false);
		String [] savingsaccountslv2list = iProperties.getInherited("savingsaccountslv2list", String[].class);
		putTreePage("savingsaccountspage", savingsaccountsrootpage, savingsaccountsusemanual, savingsaccountslv2list);

		String propertyfinancerootpage = iProperties.getInherited("propertyfinancerootpage", "");
		Boolean propertyfinanceusemanual = iProperties.getInherited("propertyfinanceusemanual", false);
		String [] propertyfinancelv2list = iProperties.getInherited("propertyfinancelv2list", String[].class);
		putTreePage("propertyfinancepage", propertyfinancerootpage, propertyfinanceusemanual, propertyfinancelv2list);

		String creditcardsrootpage = iProperties.getInherited("creditcardsrootpage", "");
		Boolean creditcardsusemanual = iProperties.getInherited("creditcardsusemanual", false);
		String [] creditcardslv2list = iProperties.getInherited("creditcardslv2list", String[].class);
		putTreePage("creditcardspage", creditcardsrootpage, creditcardsusemanual, creditcardslv2list);
		
		String assetfinancerootpage = iProperties.getInherited("assetfinancerootpage", "");
		Boolean assetfinanceusemanual = iProperties.getInherited("assetfinanceusemanual", false);
		String [] assetfinancelv2list = iProperties.getInherited("assetfinancelv2list", String[].class);
		putTreePage("assetfinancepage", assetfinancerootpage, assetfinanceusemanual, assetfinancelv2list);

		// tab 3
		putModel("expertiselabel", iProperties.getInherited("expertiselabel", "Expertise"));
		putModel("expertiseurl", CommonUtils.getProperURL(iProperties.getInherited("expertiseurl", ""), slingRequest));
		putModel("primaryexpertiselabel", iProperties.getInherited("primaryexpertiselabel", "Find answers to your questions"));
		putModel("guidestargeturl", CommonUtils.getProperURL(iProperties.getInherited("guidestargeturl", ""), slingRequest));
		String[] guidesList = iProperties.getInherited("guideslist", String[].class);
		putModel("publicationstargeturl", CommonUtils.getProperURL(iProperties.getInherited("publicationstargeturl", ""), slingRequest));
		String[] publicationsList = iProperties.getInherited("publicationslist", String[].class);
		putModel("featuredlabel", iProperties.getInherited("featuredlabel", "Featured"));
		String[] featuredList = iProperties.getInherited("featuredlist", String[].class);

		putPageList("guideslist", guidesList);
		putPageList("publicationslist", publicationsList);
		putPageList("featuredlist", featuredList);
	}

	/**
	 * Put list page with level 1 into page context
	 * @param lv2List 
	 * @param useManual 
	 */
	private void putTreePage(String name, String path, Boolean useManual, String[] lv2List) {
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);

		Page page = null;

		if (StringUtils.isNotBlank(path)) {
			page = pageManager.getPage(path);
		}

		if (null != page) {
			TreePage treePage = new TreePage();
			treePage.setIcon(getIconPath(page));
			treePage.setLabel(getTitle(page));
			treePage.setLink(CommonUtils.getProperURL(page.getPath(), slingRequest));
			treePage.setPath(page.getPath());
			if(useManual) {
				treePage.setChilds(getListTreePages(lv2List));
			} else {
				treePage.setChilds(getAllChildPages(path));
			}

			putModel(name, treePage);
		}
	}

	/**
	 * Get all {@link TreePage} from list paths
	 * @param listPaths
	 * @return
	 */
	private List<TreePage> getListTreePages(String [] listPaths) {
		List<TreePage> pages = new ArrayList<TreePage>();
		
		if(null == listPaths){
			return pages;
		}
		
		try {
			PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
			for (String pagePath : listPaths) {
				
				Page page = null;
				if (StringUtils.isNotBlank(pagePath)) {
					page = pageManager.getPage(pagePath);
				}
				
				if (null != page && !page.isHideInNav()) {
					TreePage treePage = new TreePage();
					treePage.setIcon(getIconPath(page));
					treePage.setLabel(getTitle(page));
					treePage.setLink(CommonUtils.getProperURL(page.getPath(), slingRequest));
					treePage.setPath(page.getPath());
					pages.add(treePage);
				}
			}
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		return pages;
	}
	
	/**
	 * Get all children pages form parent path
	 * 
	 * @param parentpath
	 * @return
	 */
	private List<TreePage> getAllChildPages(String parentpath) {
		List<TreePage> pages = new ArrayList<TreePage>();
		try {
			PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
			Page page = null;

			if (StringUtils.isNotBlank(parentpath)) {
				page = pageManager.getPage(parentpath);
			}

			if (null != page) {
				Iterator<Page> iterable = page.listChildren();
				if (iterable != null) {
					while (iterable.hasNext()) {
						Page childPage = iterable.next();
						if (!childPage.isHideInNav()) {
							TreePage treePage = new TreePage();
							treePage.setIcon(getIconPath(childPage));
							treePage.setLabel(getTitle(childPage));
							treePage.setLink(CommonUtils.getProperURL(childPage.getPath(), slingRequest));
							treePage.setPath(childPage.getPath());
							pages.add(treePage);
						}
					}
				}
			}
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		return pages;
	}

	/**
	 * Put list {@link CustomXtype} into page context with name
	 * 
	 * @param name
	 * @param pageList
	 */
	private void putPageList(String name, String[] pageList) {
		if (null == pageList) {
			return;
		}
		List<CustomXtypeWithIcon> pageBeans = new ArrayList<CustomXtypeWithIcon>();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		for (String pagePath : pageList) {
			Page primarySpecialitiePage = pageManager.getPage(pagePath);
			CustomXtypeWithIcon bean = new CustomXtypeWithIcon();
			bean.setIcon(getIconPath(primarySpecialitiePage));
			bean.setLabel(getTitle(primarySpecialitiePage));
			bean.setLink(CommonUtils.getProperURL(pagePath, slingRequest));
			pageBeans.add(bean);
		}
		putModel(name, pageBeans);
	}

	/**
	 * Get title of {@link Page} with order Override Label > Navigation Title >
	 * Page Title > Title > Name
	 * 
	 * @param page
	 * @return
	 */
	public static String getTitle(Page page) {

		String title = null;
		if (page != null) {
			title = page.getProperties().get("overridelabel", String.class);
			if (title == null) {
				title = page.getNavigationTitle();
				if (title == null) {
					title = page.getPageTitle();
					if (title == null) {
						title = page.getTitle();
						if (title == null) {
							title = page.getName();
						}
					}
				}
			}
		}
		return title;
	}

	/**
	 * Get icon path of {@link Page} with order Override Icon Path > Page Icon
	 * 
	 * @param page
	 * @return
	 */
	public static String getIconPath(Page page) {

		String iconPath = null;
		if (page != null) {
			iconPath = page.getProperties().get("overrideiconpath", String.class);
			if (iconPath == null) {
				iconPath = page.getProperties().get("pageicon", String.class);
			}
		}
		return iconPath;
	}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ConfigurationService {

    constructor(public http: HttpClient) { }

    // Category CRUD

    AddCategory = (model) => {
        return this.http.post<any>(`${environment.AppCategory}/Add`, model)
    }
    UpdateCategory = (model) => {
        return this.http.put<any>(`${environment.AppCategory}/Update`, model)
    }
    GetCategory = (params) => {
        return this.http.get<any>(`${environment.AppCategory}/Get`, { params })
    }
    GetCategoryList = (params) => {
        return this.http.get<any>(`${environment.AppCategory}/GetList`, { params })
    }
    ActivateCategory = (model) => {
        return this.http.put<any>(`${environment.AppCategory}/Activate`, model)
    }
    // Brand CRUD

    AddBrand = (model) => {
        return this.http.post<any>(`${environment.AppBrand}/Add`, model)
    }
    UpdateBrand = (model) => {
        return this.http.put<any>(`${environment.AppBrand}/Update`, model)
    }
    GetBrand = (params) => {
        return this.http.get<any>(`${environment.AppBrand}/Get`, { params })
    }
    GetBrandList = (params) => {
        return this.http.get<any>(`${environment.AppBrand}/GetList`, { params })
    }
    ActivateBrand = (model) => {
        return this.http.put<any>(`${environment.AppBrand}/Activate`, model)
    }
    // Brand CRUD

    AddMake = (model) => {
        return this.http.post<any>(`${environment.AppMake}/Add`, model)
    }
    UpdateMake = (model) => {
        return this.http.put<any>(`${environment.AppMake}/Update`, model)
    }
    GetMake = (params) => {
        return this.http.get<any>(`${environment.AppMake}/Get`, { params })
    }
    GetMakeList = (params) => {
        return this.http.get<any>(`${environment.AppMake}/GetList`, { params })
    }
    ActivateMake = (model) => {
        return this.http.put<any>(`${environment.AppMake}/Activate`, model)
    }
    // Model CRUD

    AddModel = (model) => {
        return this.http.post<any>(`${environment.AppModel}/Add`, model)
    }
    UpdateModel = (model) => {
        return this.http.put<any>(`${environment.AppModel}/Update`, model)
    }
    GetModel = (params) => {
        return this.http.get<any>(`${environment.AppModel}/Get`, { params })
    }
    GetModelList = (params) => {
        return this.http.get<any>(`${environment.AppModel}/GetList`, { params })
    }
    ActivateModel = (model) => {
        return this.http.put<any>(`${environment.AppModel}/Activate`, model)
    }
    // Type CRUD

    AddType = (model) => {
        return this.http.post<any>(`${environment.AppType}/Add`, model)
    }
    UpdateType = (model) => {
        return this.http.put<any>(`${environment.AppType}/Update`, model)
    }
    GetType = (params) => {
        return this.http.get<any>(`${environment.AppType}/Get`, { params })
    }
    GetTypeList = (params) => {
        return this.http.get<any>(`${environment.AppType}/GetList`, { params })
    }
    ActivateType = (model) => {
        return this.http.put<any>(`${environment.AppType}/Activate`, model)
    }
    // Engine CRUD

    AddEngine = (model) => {
        return this.http.post<any>(`${environment.AppEngine}/Add`, model)
    }
    UpdateEngine = (model) => {
        return this.http.put<any>(`${environment.AppEngine}/Update`, model)
    }
    GetEngine = (params) => {
        return this.http.get<any>(`${environment.AppEngine}/Get`, { params })
    }
    GetEngineList = (params) => {
        return this.http.get<any>(`${environment.AppEngine}/GetList`, { params })
    }
    ActivateEngine = (model) => {
        return this.http.put<any>(`${environment.AppEngine}/Activate`, model)
    }
    // Banner CRUD

    AddBanner = (model) => {
        return this.http.post<any>(`${environment.AppBanner}/Add`, model)
    }
    UpdateBanner = (model) => {
        return this.http.put<any>(`${environment.AppBanner}/Update`, model)
    }
    GetBanner = (params) => {
        return this.http.get<any>(`${environment.AppBanner}/Get`, { params })
    }
    GetBannerList = (params) => {
        return this.http.get<any>(`${environment.AppBanner}/GetList`, { params })
    }
    ActivateBanner = (model) => {
        return this.http.put<any>(`${environment.AppBanner}/Activate`, model)
    }
    // Banner CRUD

    AddSlider = (model) => {
        return this.http.post<any>(`${environment.AppSlider}/Add`, model)
    }
    UpdateSlider = (model) => {
        return this.http.put<any>(`${environment.AppSlider}/Update`, model)
    }
    GetSlider = (params) => {
        return this.http.get<any>(`${environment.AppSlider}/Get`, { params })
    }
    GetSliderList = (params) => {
        return this.http.get<any>(`${environment.AppSlider}/GetList`, { params })
    }
    ActivateSlider = (model) => {
        return this.http.put<any>(`${environment.AppSlider}/Activate`, model)
    }
    // Product CRUD

    AddProduct = (model) => {
        return this.http.post<any>(`${environment.AppProduct}/Add`, model)
    }
    UpdateProduct = (model) => {
        return this.http.put<any>(`${environment.AppProduct}/Update`, model)
    }
    GetProduct = (params) => {
        return this.http.get<any>(`${environment.AppProduct}/Get`, { params })
    }
    GetProductList = (params) => {
        return this.http.get<any>(`${environment.AppProduct}/GetList`, { params })
    }
    ActivateProduct = (model) => {
        return this.http.put<any>(`${environment.AppProduct}/Activate`, model)
    }
    // User CRUD

    AddUser = (model) => {
        return this.http.post<any>(`${environment.AppUser}/Add`, model)
    }
    UpdateUser = (model) => {
        return this.http.put<any>(`${environment.AppUser}/Update`, model)
    }
    GetUser = (params) => {
        return this.http.get<any>(`${environment.AppUser}/Get`, { params })
    }
    GetUserList = (params) => {
        return this.http.get<any>(`${environment.AppUser}/GetList`, { params })
    }
    ActivateUser = (model) => {
        return this.http.put<any>(`${environment.AppUser}/Activate`, model)
    }
    GetOrder = (params) => {
        return this.http.get<any>(`${environment.AppOrder}/Get`, { params })
    }
    GetOrderList = (params) => {
        return this.http.get<any>(`${environment.AppOrder}/Get`, { params })
    }
    ActivateOrder = (model) => {
        return this.http.put<any>(`${environment.AppOrder}/Activate`, model)
    }
    ActivateProductDocument = (model) => {
        return this.http.put<any>(`${environment.AppDocument}/Activate`, model)
    }
    UpdateLookupValue = (model) => {
        return this.http.put<any>(`${environment.AppValue}/UpdateLookupValue`, model)
    }
    GetLookupByCode = (params) => {
        return this.http.get<any>(`${environment.AppValue}/GetLookupByCode`, { params })
    }

    // For Login
    LoginUser = (model) => {
        return this.http.post<any>(`${environment.AppLogin}/auth`, model)
    }
}

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
        return this.http.get<any>(`${environment.AppOrder}/GetList`, { params })
    }
    ActivateOrder = (model) => {
        return this.http.put<any>(`${environment.AppOrder}/Activate`, model)
    }
}

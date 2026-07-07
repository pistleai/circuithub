import os
import urllib.request

DESIGN_DIR = "public/design"

IMAGES_TO_DOWNLOAD = {
    # Hero Carousel Slides
    "hero_slide1.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuDUARLf0gBu0hrLrSWQDxI8MWWoa-9m9ii0nEtBpHdsBwEEtMDvRhInJDVR25_HMGiYXrz0g1CdW2FBxu5nFwFF6DkHWKhpfE799cLpm3uapZK4Wx4ZPsuEeGVg7af_gfI4q8CbRRzAksSk1jJbmzy3n3hhseqekcP5F8gm558keTi9V4d2GgdwEEnLTwIQdMb3A4nUJaVp8QuK8uKeK0qM3C_ap-Atskzni93X4ReVh1OxstMA55rxfg",
    "hero_slide2.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuCN8zKvdlbnZyhq69Vpai_LLqlk3dJOntha3D6FQ92qKkUdqlqDjcv01GbnTZgi6Ekr2x9fpUJK73iewXnghqODsc0GcWBk9BqRga8tS6JiLxMQMqkGTNN2jpkm7u1E2IA2TpemYIKrcpH_ByiWkuLutTgwr1pvCl3r-kQfMxJVTBx0J0IPnHKIW-Tn37OTVxf_gc_BsHwM4-X_7gVm0fBLkNtNpc46zQ-5fAG1xojzv3nX2-SLks6tcg",
    "hero_slide3.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuBO9ZpM1wDWhUvgSMDviLFw44SzOQUrMZIVg3Vivz_XNCHy7idkEmDrgrYSETQUHPiXDyc525JIwrAjfeAhZbJMRYrcR7DDQUs7fHjpcbhGzYYfghjej4F5nglFve0ftrGNgbhNTFJ3n4A7cb5lp6sNsFANDKa_EzgwrjGpYvmmtYHdG8o7h-MEzz3Mar7aTNDPQHzNjLOWjQnSveCysZDWLz05qC5BQ0nGTwQH8huievkmtw3wX3r49Q",
    
    # Categories
    "cat_dev_boards.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuASlxQzAdl0XoxNPxeyD4ccKwnrhc9VTddhIhF8e4a5jLfEotTaD_91WjMnBYQ9vRLcOuyPbOPSdIMyfzxjnOwBmB0pLo7pjNRUClq2i07cuC0cW19brXlBFlB7_oT4DSII7SIH1o0fX-KVbwhiDfo0WOCOGwJkIDAY_pZEfhAE21QZ-WVyrovndn0uOK3O47BdY2YwsEiUv-7hiBYkTIud3w2lywa5mxgQDkhNQymJBcl5KAQNuB_mag",
    "cat_sensors.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuCN8zKvdlbnZyhq69Vpai_LLqlk3dJOntha3D6FQ92qKkUdqlqDjcv01GbnTZgi6Ekr2x9fpUJK73iewXnghqODsc0GcWBk9BqRga8tS6JiLxMQMqkGTNN2jpkm7u1E2IA2TpemYIKrcpH_ByiWkuLutTgwr1pvCl3r-kQfMxJVTBx0J0IPnHKIW-Tn37OTVxf_gc_BsHwM4-X_7gVm0fBLkNtNpc46zQ-5fAG1xojzv3nX2-SLks6tcg",
    "cat_motors.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuASfAQQepdLLEB80v63ds8DjPG8uwOKo506-KW0VyY8RFF5ru5AcoGi7v8jBrnJmB9sz2Bo2Rf8dOy8MGzWYH_1oFwz3YFJWkmEGNCZ2-Tq_jL2_TXNt4zxCuKBRKIrtDiHG_Dd_zIQlIQwTm02qVcPLIfx7sSTGvQsyqF11den42LO-JsTd9BClJaRScY8xbMUVoER5aO1XFRyBKXo4S6VZOQvCQP846tplQW8SVan7ok2t5LKTR9qGA",
    "cat_robotics_kits.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuDFfaW6JtLqsMK6j-Xa5D_Go6P2Jgq3tq8-wqayBbq7EUg_C9no2_pSSHiNmb9MPazXKGzEQVylhC1BkJr5jIb-06R3oo8YG7MgoowmLE47CWuQYXG5wiLXpfhvJX9Vo8JaoIVitcdbTENX3wovsChKkonjZJLAQjlQKvGQx0HJpmtRGTYcV1Ul7WC7ugrciYFrobg0nypQEERcBdl_taLCKDDo-7iij6Y-aQyqSsQ9rDYxielF6CPiPQ",
    "cat_tools.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuBO9ZpM1wDWhUvgSMDviLFw44SzOQUrMZIVg3Vivz_XNCHy7idkEmDrgrYSETQUHPiXDyc525JIwrAjfeAhZbJMRYrcR7DDQUs7fHjpcbhGzYYfghjej4F5nglFve0ftrGNgbhNTFJ3n4A7cb5lp6sNsFANDKa_EzgwrjGpYvmmtYHdG8o7h-MEzz3Mar7aTNDPQHzNjLOWjQnSveCysZDWLz05qC5BQ0nGTwQH8huievkmtw3wX3r49Q",
    
    # Products
    "prod_uno.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuDtg71waBzOY3_wCCDzrfhvrrEXA_Yl_8lSEtyBMQ7saxBnBJWI4TV6waS_2oJoq1aMJuE5IPKpdlg3goLD8H3QfPDgOrOUBqHHaiz_clUp9klT0fwya_kgNQI29MeV5eZK9y5PaMF0jhhv-RAUbgbZjKu6dgo86qOuAMsiQRufRYuoxGNGbW7076STbotowOvoYRzAw-O9zNf1ElBV-VLIowhe9rIj2AgbBdC4vE3CW6IhUEgwlTmyxA",
    "prod_esp32.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuBNvbj_9tdjUSul6NrBCiNGhapPa8kCo1tOa_bEPpMxWZUOjF5bZXufIifCQM80idPHuyO5qX2Ng--gMd3-758iqeFYwBpDExcPxObEyqsRsCyRdkv0R0FThz1R_pzox2xSjVxQoHuZz4qrhnwJHOTa4ynsZTil4r2rCYSph84cDjX-fPYanuv4j3m_tTlLy9oVI4pRuowpeyExQRsCqevQ3YF_QZ9RSimPPhmZG7fhb39LiJuf_ZzYrg",
    "prod_hc_sr04.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuD4F-tTT91LQC45pYWsJ5ME3w7AGlsqzCCGzGuZCifPQsVjaWdmOkRMxZnLAc6KsOhNnbqDw3ZtReWuQYsgtRDFPO3dNxXnFsM-2ZuMbh0hXXmFjOcaiPNDCW1Y8r-Ua0p43Z3jFQ635V0U_MhF-baE7njNxZB8arFB2wIxIJqAMkeA4BpwwnVc9yijo9ihC80FsonRQ3RAkRRxiVnkJlOBGklO7UxXdoZt5xEKM1xVyVwuHIAvcMVgug",
    "prod_robot_car.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuB5krSJR3GDnXR9PdzmYeXrCGxkWjZrYRHbbiw4jVRc-etWH1aCdTQRY9BCf66rE6vt_g7auma5mh_k6SzcDm94JUUANRL4Wung7Vplb5uFu2oZhH5wkuvyqC4LPzO0NGBF6wGAb9SZ2mO8yKQrUmyhGNDNSDd3edN7XpqMRcG_UAHfA-lGwdsKRmsSb1asqd_SWLPZ865FmhjBwMANuCS68B3uMcPuXTvyIov7pXJ8V4grstFdZna4TA",
    "prod_battery_18650.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ie_TUy8M_TaCm1u8J7uJ6u1a00Dhm5IwDWmH2SVnbUHgGHo4HGxQ2eZq9Gd9uKDROvnthcZ_OrNSgcgfCzbjFEaPvPzHqO3GJ59rQjK4ubuDwAtSypOqv0PdMB3mKj2Y8It4dNnf1odnQFZbwg3fDg82N5EIhwy4-R32eKD4f33So7-KCPFt4Gy37BgbNzyKK5NzEyFeiernEa5GF0RzvIrVwXm3GsOe75FSPAe_CQYfO19uBVpPhg"
}

def main():
    if not os.path.exists(DESIGN_DIR):
        print(f"Creating directory {DESIGN_DIR}...")
        os.makedirs(DESIGN_DIR)
        
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    for filename, url in IMAGES_TO_DOWNLOAD.items():
        local_path = os.path.join(DESIGN_DIR, filename)
        print(f"Downloading {url} -> {local_path}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as response:
                with open(local_path, 'wb') as out_file:
                    out_file.write(response.read())
            print(f"  Successfully saved to {local_path} ({os.path.getsize(local_path)} bytes)")
        except Exception as e:
            print(f"  Error downloading {filename}: {e}")
            
    print("\nAll downloads complete!")

if __name__ == "__main__":
    main()

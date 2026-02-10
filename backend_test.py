#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class RasinoDrugsAPITester:
    def __init__(self, base_url="https://rasino-biotech.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.passed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                self.passed_tests.append(name)
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_seed_database(self):
        """Test database seeding"""
        return self.run_test("Seed Database", "POST", "seed", 200)

    def test_get_products(self):
        """Test getting all products"""
        return self.run_test("Get All Products", "GET", "products", 200)

    def test_get_products_by_category(self):
        """Test filtering products by category"""
        success1, _ = self.run_test("Get API Products", "GET", "products", 200, params={"category": "API"})
        success2, _ = self.run_test("Get Intermediate Products", "GET", "products", 200, params={"category": "Intermediate"})
        success3, _ = self.run_test("Get Fine Chemical Products", "GET", "products", 200, params={"category": "Fine Chemical"})
        return success1 and success2 and success3

    def test_search_products(self):
        """Test product search functionality"""
        success1, _ = self.run_test("Search Products by Name", "GET", "products", 200, params={"search": "Chlorpromazine"})
        success2, _ = self.run_test("Search Products by CAS", "GET", "products", 200, params={"search": "69-09-0"})
        return success1 and success2

    def test_get_featured_products(self):
        """Test getting featured products"""
        return self.run_test("Get Featured Products", "GET", "products", 200, params={"featured": "true"})

    def test_get_product_categories(self):
        """Test getting product categories"""
        return self.run_test("Get Product Categories", "GET", "products/categories", 200)

    def test_get_single_product(self):
        """Test getting a single product by ID"""
        return self.run_test("Get Single Product", "GET", "products/prod-001", 200)

    def test_get_nonexistent_product(self):
        """Test getting a non-existent product"""
        return self.run_test("Get Non-existent Product", "GET", "products/invalid-id", 404)

    def test_create_inquiry(self):
        """Test creating an inquiry"""
        inquiry_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "phone": "+1234567890",
            "country": "India",
            "product_id": "prod-001",
            "product_name": "Chlorpromazine HCL",
            "quantity": "100 kg",
            "message": "Test inquiry for product availability",
            "inquiry_type": "product"
        }
        return self.run_test("Create Product Inquiry", "POST", "inquiries", 200, data=inquiry_data)

    def test_create_general_inquiry(self):
        """Test creating a general inquiry"""
        inquiry_data = {
            "name": "General Test User",
            "email": "general@example.com",
            "company": "General Test Company",
            "country": "United States",
            "message": "General inquiry about services",
            "inquiry_type": "general"
        }
        return self.run_test("Create General Inquiry", "POST", "inquiries", 200, data=inquiry_data)

    def test_get_inquiries(self):
        """Test getting all inquiries"""
        return self.run_test("Get All Inquiries", "GET", "inquiries", 200)

    def test_get_certifications(self):
        """Test getting all certifications"""
        return self.run_test("Get All Certifications", "GET", "certifications", 200)

    def test_invalid_inquiry(self):
        """Test creating inquiry with invalid data"""
        invalid_data = {
            "name": "Test",
            "email": "invalid-email",  # Invalid email format
            "company": "Test Company",
            "country": "India",
            "message": "Test message"
        }
        success, _ = self.run_test("Invalid Inquiry Data", "POST", "inquiries", 422, data=invalid_data)
        return success

def main():
    print("🧪 Starting Rasino Drugs API Testing...")
    print("=" * 60)
    
    tester = RasinoDrugsAPITester()
    
    # Test sequence
    test_methods = [
        tester.test_root_endpoint,
        tester.test_seed_database,
        tester.test_get_products,
        tester.test_get_products_by_category,
        tester.test_search_products,
        tester.test_get_featured_products,
        tester.test_get_product_categories,
        tester.test_get_single_product,
        tester.test_get_nonexistent_product,
        tester.test_create_inquiry,
        tester.test_create_general_inquiry,
        tester.test_get_inquiries,
        tester.test_get_certifications,
        tester.test_invalid_inquiry
    ]
    
    # Run all tests
    for test_method in test_methods:
        try:
            test_method()
        except Exception as e:
            print(f"❌ Test method failed: {test_method.__name__} - {str(e)}")
            tester.failed_tests.append({
                "test": test_method.__name__,
                "error": str(e)
            })

    # Print summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {tester.tests_run}")
    print(f"Passed: {tester.tests_passed}")
    print(f"Failed: {len(tester.failed_tests)}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for failure in tester.failed_tests:
            print(f"  - {failure.get('test', 'Unknown')}: {failure.get('error', failure.get('response', 'Unknown error'))}")
    
    if tester.passed_tests:
        print(f"\n✅ PASSED TESTS ({len(tester.passed_tests)}):")
        for passed in tester.passed_tests:
            print(f"  - {passed}")
    
    # Return appropriate exit code
    return 0 if len(tester.failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
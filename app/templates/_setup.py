
from setuptools import setup, find_packages

def parse_packages(package_file, packages=[]):
    with open(package_file, 'r') as f:
        for line in f:
            packages.append(line.rstrip())
    return packages

install_packages = parse_packages('require/common.txt')

setup(name='<%= moduleName %>',
    version='0.0.0',
    description="<%= description %>",
    packages=find_packages(),
    install_requires=install_packages)

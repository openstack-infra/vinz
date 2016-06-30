from setuptools import setup, find_packages


__version__ = "0.0.1"


setup(
    name="vinz",
    version=__version__,
    description="Flask vinz application",
    author="OpenStack",
    author_emali="",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask>=0.10.0",
        "Flask-Webpack>=0.0.7",
        "Flask-Cors>=2.1.2",
        "pyOpenSSL>=16.0.0",
        "requests>=2.10.0"
    ]
)
